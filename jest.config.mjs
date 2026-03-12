import nextJest from "next/jest.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const createJestConfig = nextJest({ dir: __dirname });

/** @type {import('jest').Config} */
const customJestConfig = {
  testMatch: ["**/*.test.{ts,tsx}"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  passWithNoTests: true,
  testEnvironment: "jsdom",
};

export default createJestConfig(customJestConfig);
