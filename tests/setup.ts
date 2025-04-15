import '@testing-library/jest-dom';

process.env.DATABASE_URL='postgresql://yann:mI2mona.@34.38.35.197:5432/mysaasdb';
process.env.JWT_SECRET = "323546567568789789000123"; // Clé test JWT

export const TEST_SERVER_ADDRESS = 'http://localhost:3001';
