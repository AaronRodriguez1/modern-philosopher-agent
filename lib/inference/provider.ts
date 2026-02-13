export type InferenceProvider = "huggingface" | "stub";

type HuggingFaceOutput = {
  generated_text?: string;
};

type GenerateInferenceResponseArgs = {
  prompt: string;
  provider: InferenceProvider;
  model?: string;
  accessToken?: string;
  fetchImpl?: typeof fetch;
};

export type InferenceResult = {
  text: string;
  provider: InferenceProvider;
  usedFallback: boolean;
};

const DEFAULT_FALLBACK_PREFIX = "Adlerian response";

function buildFallback(prompt: string, provider: InferenceProvider): InferenceResult {
  return {
    text: `${DEFAULT_FALLBACK_PREFIX} to: ${prompt}`,
    provider,
    usedFallback: true,
  };
}

export async function generateInferenceResponse(
  args: GenerateInferenceResponseArgs,
): Promise<InferenceResult> {
  if (args.provider !== "huggingface") {
    return buildFallback(args.prompt, "stub");
  }

  if (!args.accessToken) {
    return buildFallback(args.prompt, "huggingface");
  }

  const model = args.model ?? "google/flan-t5-small";
  const fetchImpl = args.fetchImpl ?? fetch;

  const response = await fetchImpl(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${args.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: args.prompt }),
    },
  );

  if (!response.ok) {
    return buildFallback(args.prompt, "huggingface");
  }

  const payload = (await response.json()) as HuggingFaceOutput[] | HuggingFaceOutput;
  const first = Array.isArray(payload) ? payload[0] : payload;
  const text = first?.generated_text?.trim();

  if (!text) {
    return buildFallback(args.prompt, "huggingface");
  }

  return {
    text,
    provider: "huggingface",
    usedFallback: false,
  };
}
