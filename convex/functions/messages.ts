import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

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

    // Placeholder for LLM inference. Replace with Convex action later.
    const assistantReply = `Adlerian response to: ${args.content}`;

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
