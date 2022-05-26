const { compilerOptions } = require('./tsconfig.json')
const { pathsToModuleNameMapper }  = require('ts-jest/utils')

export default {
  clearMocks: true,
  coverageProvider: "v8",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  preset: "ts-jest",
};
