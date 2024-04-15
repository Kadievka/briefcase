// cucumber.js
let common = [
    'tests/e2e/features/**/*.feature', // Specify our feature files
    '--require-module ts-node/register', // Load TypeScript module
    '--require tests/e2e/stepsDefinitions/**/*.ts', // Load step definitions
    // Next steps are for generate the e2e report
    '--require cucumber.node.js',
    '--format json:playwright/reports/cucumber-html-reporter.json',
    '--format message:playwright/reports/cucumber-html-reporter.ndjson',
    '--format html:playwright/reports/report.html',
    '--publish-quiet',
    '--format @cucumber/pretty-formatter',
].join(' ');

module.exports = {
    default: common,
};
