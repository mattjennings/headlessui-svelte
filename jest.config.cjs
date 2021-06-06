module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    '.+\\.js$': 'babel-jest',
    '.+\\.svelte$': 'svelte-jester'
  },
  transformIgnorePatterns: ['node_modules/?!(svelte-elements)'],
  moduleFileExtensions: ['js', 'svelte']
}
