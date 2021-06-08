module.exports = {
  globals: {
    'ts-jest': {
      packageJson: 'package.json'
    }
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    './src/test-utils/custom-matchers.ts'
  ],
  transform: {
    '.+\\.js$': 'babel-jest',
    '.+\\.ts$': 'ts-jest',
    '.+\\.svelte$': ['svelte-jester', { preprocess: true }]
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  }
}
