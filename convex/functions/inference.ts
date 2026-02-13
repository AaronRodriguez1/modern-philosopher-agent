export async function inferenceStub(): Promise<{ ok: false; reason: string }> {
  return { ok: false, reason: "inference functions not implemented" };
}
