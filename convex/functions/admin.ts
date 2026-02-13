export async function adminStub(): Promise<{ ok: false; reason: string }> {
  return { ok: false, reason: "admin functions not implemented" };
}
