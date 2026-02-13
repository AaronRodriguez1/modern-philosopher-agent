export async function feedbackStub(): Promise<{ ok: false; reason: string }> {
  return { ok: false, reason: "feedback functions not implemented" };
}
