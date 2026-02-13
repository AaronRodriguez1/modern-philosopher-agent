import { action } from "../_generated/server";
import { v } from "convex/values";
import { generateInferenceResponse } from "../../lib/inference/provider";

function getInferenceConfig() {
  return {
    provider: (process.env.LLM_PROVIDER ?? "huggingface") as "huggingface" | "stub",
    model: process.env.HUGGINGFACE_MODEL ?? "google/flan-t5-small",
    accessToken: process.env.HUGGINGFACE_API_TOKEN ?? "",
  };
}

export const generateAdlerResponse = action({
  args: { prompt: v.string() },
  handler: async (_ctx, args) => {
    const config = getInferenceConfig();
    return await generateInferenceResponse({
      prompt: args.prompt,
      provider: config.provider,
      model: config.model,
      accessToken: config.accessToken,
    });
  },
});
