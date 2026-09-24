import { expect, test } from "@playwright/test";
import { signAccessToken, verifyAccessToken } from "../lib/access-token";

const secret = "test-secret";
const sessionId = "cs_test_a1B2c3D4e5F6";

test("round-trips a session id", () => {
  const token = signAccessToken(sessionId, secret);
  expect(verifyAccessToken(token, secret)).toBe(sessionId);
});

test("rejects tokens signed with another secret", () => {
  const token = signAccessToken(sessionId, "other-secret");
  expect(verifyAccessToken(token, secret)).toBeNull();
});

test("rejects a tampered payload", () => {
  const [, signature] = signAccessToken(sessionId, secret).split(".");
  const forged = Buffer.from("cs_test_someone_else").toString("base64url");
  expect(verifyAccessToken(`${forged}.${signature}`, secret)).toBeNull();
});

test("rejects malformed tokens", () => {
  for (const token of [undefined, "", "abc", "a.b.c", ".", "abc."]) {
    expect(verifyAccessToken(token, secret)).toBeNull();
  }
});
