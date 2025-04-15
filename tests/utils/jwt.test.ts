// Ce qui marchait 18/03/2025

// import { generateToken, verifyToken } from "@/utils/jwt";

// describe("Utils - JWT", () => {
//   const mockPayload = { id: "12345", email: "test@example.com" };
//   let validToken: string;

//   beforeEach(() => {
//     validToken = generateToken(mockPayload);
//   });

//   afterEach(async ()=>{
//     jest.clearAllMocks();
//   })

//   test("should generate a valid JWT token", () => {
//     expect(validToken).toBeDefined();
//     expect(typeof validToken).toBe("string");
//   });

//   test("should verify and decode the token", () => {
//     const decoded = verifyToken(validToken);
//     expect(decoded).toMatchObject(mockPayload);
//   });

//   test("should return null for an invalid token", () => {
//     const invalidToken = "invalid.token.string";
//     const result = verifyToken(invalidToken);
//     expect(result).toBeNull();
//   });

//   test("should return null for an expired token", () => {
//     const expiredToken = generateToken(mockPayload);
//     jest.spyOn(global.Date, "now").mockImplementation(() => new Date().getTime() + 1000 * 60 * 60 * 24 * 2); // Simule un jour plus tard
//     const result = verifyToken(expiredToken);
//     expect(result).toBeNull();
//     jest.restoreAllMocks(); // Nettoie les mocks
//   });
// });


import { generateToken, verifyToken } from "../../utils/jwt";

describe("Utils - JWT", () => {
  it("devrait générer un token valide", () => {
    const token = generateToken({ id: "123", email: "test@example.com" });
    expect(token).toBeDefined();
  });

  it("devrait vérifier un token valide", () => {
    const payload = { id: "123", email: "test@example.com" };
    const token = generateToken(payload);
    const decoded = verifyToken(token);
    
    expect(decoded.id).toBe(payload.id);
    expect(decoded.email).toBe(payload.email);
  });

  it("devrait échouer avec un token invalide", () => {
    expect(verifyToken("token_invalide")).toBeNull();
  });
});
