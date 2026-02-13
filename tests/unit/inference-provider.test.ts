import test from "node:test";
import assert from "node:assert/strict";
import { generateInferenceResponse } from "../../lib/inference/provider";

test("returns fallback message when HuggingFace token is missing", async () => {
  const response = await generateInferenceResponse({
    prompt: "How should I respond to conflict?",
    provider: "huggingface",
    model: "distilgpt2",
    accessToken: "",
  });

  assert.equal(response.provider, "huggingface");
  assert.equal(response.usedFallback, true);
  assert.match(response.text, /Adlerian response/i);
});

test("calls HuggingFace inference endpoint and parses generated_text", async () => {
  let calledUrl = "";
  let calledAuth = "";
  const fakeFetch: typeof fetch = async (input, init) => {
    calledUrl = String(input);
    const headers = init?.headers as Record<string, string> | undefined;
    calledAuth = String(headers?.Authorization ?? "");
    return new Response(
      JSON.stringify([{ generated_text: "Courage grows through social interest." }]),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  };

  const response = await generateInferenceResponse({
    prompt: "How should I respond to conflict?",
    provider: "huggingface",
    model: "distilgpt2",
    accessToken: "test-token",
    fetchImpl: fakeFetch,
  });

  assert.equal(calledUrl, "https://api-inference.huggingface.co/models/distilgpt2");
  assert.equal(calledAuth, "Bearer test-token");
  assert.equal(response.text, "Courage grows through social interest.");
  assert.equal(response.usedFallback, false);
});
