export async function conversationsStub(): Promise<{
  ok: false;
  reason: string;
}> {
  return { ok: false, reason: "conversation functions not implemented" };
}
