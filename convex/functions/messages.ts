import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { generateInferenceResponse } from "../../lib/inference/provider";

export const getMessages = query({
  args: { conversationId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) =>
        q.eq("conversationId", args.conversationId),
      )
      .order("asc")
      .collect();
  },
});

export const sendMessage = mutation({
  args: {
    conversationId: v.string(),
    userId: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const userMessageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      userId: args.userId,
      role: "user",
      content: args.content,
      createdAt: now,
    });

    const inference = await generateInferenceResponse({
      prompt: args.content,
      provider: (process.env.LLM_PROVIDER ?? "huggingface") as
        | "huggingface"
        | "stub",
      model: process.env.HUGGINGFACE_MODEL ?? "google/flan-t5-small",
      accessToken: process.env.HUGGINGFACE_API_TOKEN ?? "",
    });
    const assistantReply = inference.text;

    const assistantMessageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      userId: args.userId,
      role: "assistant",
      content: assistantReply,
      createdAt: now + 1,
    });

    return { userMessageId, assistantMessageId, assistantReply };
  },
});
