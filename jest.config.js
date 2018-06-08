module.exports = {
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/node_modules/jest-css-modules',
    '^Config(.*)$': '<rootDir>/config$1',
    '^Views(.*)$': '<rootDir>/src/views$1',
    '^Utils(.*)$': '<rootDir>/src/utils$1',
    '^Layouts(.*)$': '<rootDir>/src/layouts$1',
    '^Assets(.*)$': '<rootDir>/assets$1',
    '^Redux(.*)$': '<rootDir>/src/redux$1',
  },
  setupFiles: [
    './__tests__/config/enzyme.js',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/config',
    '<rootDir>/__tests__/utils',
  ],
};
