import request from "supertest";
import { generateToken } from "../../utils/jwt";
import { TEST_SERVER_ADDRESS } from "../setup";
import prismaMock from "../__mocks__/prisma";

// ✅ Mock de Prisma (Base de données)
jest.mock("@/lib/prisma", () => prismaMock);

// ✅ Mock des cookies (next/headers)
jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(() => ({ value: "mocked_token" })), // Token fictif par défaut
    set: jest.fn(),
    delete: jest.fn(),
  })),
}));

describe("API - Questionnaire", () => {
  let authToken: string;

  beforeEach(() => {
    jest.useRealTimers();
    authToken = generateToken({ id: "12345", email: "test@example.com" });

    // 🔥 Mise à jour dynamique du mock des cookies pour chaque test
    const cookiesMock = require("next/headers").cookies;
    cookiesMock.mockReturnValue({
      get: jest.fn(() => ({ value: authToken })), // ✅ Mock du token dynamique
      set: jest.fn(),
      delete: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("✅ Créer un questionnaire avec un utilisateur authentifié", async () => {
    try {
      const response = await request(TEST_SERVER_ADDRESS)
        .post("/api/questionnaire")
        .set("Cookie", `token=${authToken}`)
        .send({
          title: "Test Questionnaire",
          questions: [{ text: "Quelle est votre couleur préférée ?", type: "TEXT" }],
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id", "test-questionnaire-id");
      expect(response.body.title).toBe("Test Questionnaire");
    } catch (error) {
      console.error("❌ Erreur dans le test:", error);
      throw error; // 🔥 Relance l'erreur pour que Jest affiche plus d'infos
    }
  });

  test("❌ Rejet d'une requête sans authentification", async () => {
    try {
      const response = await request(TEST_SERVER_ADDRESS)
        .post("/api/questionnaire")
        .send({
          title: "Test Questionnaire",
          questions: [{ text: "Quelle est votre couleur préférée ?", type: "TEXT" }],
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Token introuvable");
    } catch (error) {
      console.error("❌ Erreur dans le test:", error);
      throw error;
    }
  });

  test("✅ Récupérer les questionnaires de l'utilisateur authentifié", async () => {
    try {
      const response = await request(TEST_SERVER_ADDRESS)
        .get("/api/questionnaire")
        .set("Cookie", `token=${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toHaveProperty("id", "test-questionnaire-id");
      expect(response.body[0]).toHaveProperty("title", "Test Questionnaire");
    } catch (error) {
      console.error("❌ Erreur dans le test:", error);
      throw error;
    }
  });
});
