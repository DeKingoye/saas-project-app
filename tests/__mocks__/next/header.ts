import { cookies } from "next/headers";

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(() => ({ value: "mocked_token" })), //  Retourne un token fictif
    set: jest.fn(),
    delete: jest.fn(),
  })),
}));