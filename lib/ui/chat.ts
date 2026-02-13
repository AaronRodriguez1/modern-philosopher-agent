export function formatRoleLabel(role: string): string {
  if (role === "user") return "You";
  if (role === "assistant") return "Philosopher";
  return "System";
}

export function isDraftSendable(draft: string, isSending: boolean): boolean {
  return draft.trim().length > 0 && !isSending;
}
