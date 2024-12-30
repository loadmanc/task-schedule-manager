module.exports = {
  roots: ['<rootDir>/test'],
  testMatch: ['<rootDir>/test/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
}
  