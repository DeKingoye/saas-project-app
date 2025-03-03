import { cookies } from "next/headers";

jest.mock("next/headers", () => ({
    cookies: jest.fn(() => ({
      get: jest.fn(() => ({ value: "mocked_token" })), // ✅ Retourne un token fictif
      set: jest.fn(),
      delete: jest.fn(),
    })),
  }));
  
test("✅ Mock de cookies fonctionne", async () => {
    const cookieStore = await cookies(); // Appel direct, sans async/await
    expect(cookieStore.get).toBeDefined();
    expect(cookieStore.get("token")).toEqual({ value: "mocked_token" });
});
