import test from "node:test";
import assert from "node:assert/strict";
import { formatRoleLabel, isDraftSendable } from "../../lib/ui/chat";

test("formatRoleLabel returns human-friendly labels", () => {
  assert.equal(formatRoleLabel("user"), "You");
  assert.equal(formatRoleLabel("assistant"), "Philosopher");
});

test("isDraftSendable requires non-empty text and not sending", () => {
  assert.equal(isDraftSendable("   ", false), false);
  assert.equal(isDraftSendable("Hello", true), false);
  assert.equal(isDraftSendable("Hello", false), true);
});
