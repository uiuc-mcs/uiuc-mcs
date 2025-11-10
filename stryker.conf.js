// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  _comment:
    "This config was generated using 'stryker init'. Please take a look at: https://stryker-mutator.io/docs/stryker-js/configuration/ for more information.",
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress', 'dashboard'],
  testRunner: 'karma',
  testRunner_comment:
    'More information about the karma test runner at: https://stryker-mutator.io/docs/stryker-js/karma-runner',
  karma: {
    configFile: 'karma.conf.js',
    projectType: 'angular-cli',
    config: {
      browsers: ['ChromeHeadless']
    }
  },
  coverageAnalysis: 'perTest',
  mutate: [
    'src/app/planner/**/*.ts',
    '!src/app/planner/**/*.spec.ts',
    '!src/app/planner/**/*.module.ts',
    '!src/app/planner/constants/*.ts'
  ],
  checkers: ['typescript'],
  tsconfigFile: 'tsconfig.json',
  thresholds: { high: 80, low: 60, break: 50 },
  timeoutMS: 60000,
  timeoutFactor: 2,
  tempDirName: 'stryker-tmp',
  cleanTempDir: true,
  concurrency: 4,
  htmlReporter: {
    fileName: 'mutation-report.html'
  }
};

export default config;
