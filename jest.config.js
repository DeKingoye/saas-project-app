// Ce qui marchait le 18/03/2025
/** @type {import('jest').Config} */
const config = {
    roots: ['<rootDir>'],
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
    preset: "ts-jest",
    coverageProvider: 'v8',
    testEnvironment: "jsdom",
    clearMocks: true,
    transform: {
        "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }], // Déplacement de `ts-jest` ici
    },
    moduleNameMapper: {
        "^next/headers$": "<rootDir>/tests/__mocks__/next/header.ts", // Mock `cookies()`
        "^@/(.*)$": "<rootDir>/$1",
    },
    testPathIgnorePatterns: [
        '<rootDir>[/\\\\](node_modules|.next|extension)[/\\\\]',
    ],
    transformIgnorePatterns: [
        '[/\\\\](node_modules|extension)[/\\\\].+\\.(ts|tsx)$',
      ],
    setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"], // Charge les mocks APRES l'environnement Jest
    testMatch: ["<rootDir>/tests/**/*.test.{ts,tsx}"],
    collectCoverage: true, // Active la collecte de couverture
    collectCoverageFrom: [
        'app/**/*.{ts,tsx}',
        'utils/**/*.{ts,tsx}',
        'context/**/*.{ts,tsx}',
        '!**/node_modules/**',
        '!.next/**',
        '!extension/**',
    ], // Cible uniquement les fichiers utiles
};

module.exports = config;


// /** @type {import('jest').Config} */
// const config = {
//     roots: ['<rootDir>'],
//     moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
//     preset: "ts-jest",
//     coverageProvider: 'v8',
//     testEnvironment: "node", // ✅ Utilisation de Node.js pour Prisma
//     clearMocks: true,
//     transform: {
//         "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }], 
//     },
//     moduleNameMapper: {
//         "^next/headers$": "<rootDir>/tests/__mocks__/next/header.ts", // ✅ Mock `cookies()`
//         "^@/(.*)$": "<rootDir>/$1",
//         "^@/lib/prisma$": "<rootDir>/tests/__mocks__/prisma.ts" // ✅ Remplace Prisma par le mock
//     },
//     testPathIgnorePatterns: [
//         '<rootDir>[/\\\\](node_modules|.next|extension)[/\\\\]',
//     ],
//     transformIgnorePatterns: [
//         '[/\\\\](node_modules|extension)[/\\\\].+\\.(ts|tsx)$',
//     ],
//     setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"], // ✅ Charge `setup.ts` après l'environnement Jest
//     testMatch: ["<rootDir>/tests/**/*.test.{ts,tsx}"],
//     collectCoverage: true, // ✅ Active la couverture de code
//     collectCoverageFrom: [
//         'app/**/*.{ts,tsx}',
//         'utils/**/*.{ts,tsx}',
//         'context/**/*.{ts,tsx}',
//         '!**/node_modules/**',
//         '!.next/**',
//         '!extension/**',
//     ],
// };

// module.exports = config;


// /** @type {import('jest').Config} */
// const config = {
//     roots: ['<rootDir>'],
//     moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
//     preset: "ts-jest",
//     coverageProvider: 'v8',
//     testEnvironment: "node", // ✅ Utilisation de Node.js pour Prisma
//     clearMocks: true,
//     transform: {
//         "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }], 
//     },
//     moduleNameMapper: {
//         "^next/headers$": "<rootDir>/tests/__mocks__/next/header.ts", // ✅ Mock `cookies()`
//         "^@/(.*)$": "<rootDir>/$1",
//         "^@/lib/prisma$": "<rootDir>/tests/__mocks__/prisma.ts" // ✅ Remplace Prisma par le mock
//     },
//     testPathIgnorePatterns: [
//         '<rootDir>[/\\\\](node_modules|.next|extension)[/\\\\]',
//     ],
//     transformIgnorePatterns: [
//         '[/\\\\](node_modules|extension)[/\\\\].+\\.(ts|tsx)$',
//     ],
//     setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"], // ✅ Charge `setup.ts` après l'environnement Jest
//     testMatch: ["<rootDir>/tests/**/*.test.{ts,tsx}"],
//     testTimeout: 30000, // ✅ Étend le timeout à 15 secondes
//     collectCoverage: true, // ✅ Active la couverture de code
//     collectCoverageFrom: [
//         'app/**/*.{ts,tsx}',
//         'utils/**/*.{ts,tsx}',
//         'context/**/*.{ts,tsx}',
//         '!**/node_modules/**',
//         '!.next/**',
//         '!extension/**',
//     ],
// };

// module.exports = config;
