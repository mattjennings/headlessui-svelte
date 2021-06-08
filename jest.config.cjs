module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    'jest-svelte-events/extend-expect'
  ],
  transform: {
    '.+\\.(js|ts)$': 'ts-jest',
    '.+\\.svelte$': ['svelte-jester', { preprocess: true }]
  },
  moduleFileExtensions: ['js', 'ts', 'svelte']
}
