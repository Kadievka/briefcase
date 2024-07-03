// cucumber.ts
const common = [
    /*************************************** TESTS IN ORDER ***************************************************** */
    // Specify our feature files
    'tests/e2e/features/SignUp.feature',
    'tests/e2e/features/**/*.feature', 

    // Load TypeScript module
    '--require-module ts-node/register',

    // Load step definitions
    '--require tests/e2e/features/stepsDefinitions/**/*.ts', 

    // this is to make World work
    '--require tests/e2e/classes/**/*.ts', // Load step definitions

    /*************************************** GENERATE e2e REPORT ***************************************************** */
    // Next steps are for generate the e2e report
    '--require cucumber.node.js',
    '--format json:playwright/reports/cucumber-html-reporter.json',
    '--format message:playwright/reports/cucumber-html-reporter.ndjson',
    '--format html:playwright/reports/report.html',
    '--publish-quiet',
    '--format @cucumber/pretty-formatter',

    // https://cucumber.io/docs/guides/10-minute-tutorial/?lang=javascript
    `--format-options '{"snippetInterface": "synchronous"}'`
].join(' ');

module.exports = {
    default: common,
};
