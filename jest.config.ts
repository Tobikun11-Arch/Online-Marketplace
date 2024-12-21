import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Path to your Next.js app to load next.config.mjs and .env files
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Handle image imports
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|svg)$': '<rootDir>/__mocks__/FileMock.ts',
  },
}

export default createJestConfig(config)
