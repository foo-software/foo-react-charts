module.exports = {
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  rootDir: 'src',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
