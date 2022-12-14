export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    'uuid': require.resolve('uuid'),
  },
  transformIgnorePatterns: [
    "/node_modules/(?!uuid)",
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
}
