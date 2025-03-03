import { PrismaClient } from "@prisma/client";
import { jest } from "@jest/globals";
import { mockDeep, mockReset } from "jest-mock-extended";

beforeEach(() => {
  mockReset(prismaMock);
});

const prismaMock = mockDeep<PrismaClient>();

export default prismaMock;