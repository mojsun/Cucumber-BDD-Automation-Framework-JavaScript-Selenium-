const report = require('cucumber-html-reporter');
const path = require('path');

const reportPath = path.join(__dirname, '..', 'reports', 'cucumber-report.json');
const outputPath = path.join(__dirname, '..', 'reports', 'cucumber-report.html');

const options = {
  theme: 'bootstrap',
  jsonFile: reportPath,
  output: outputPath,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': 'automationexercise.com',
    Browser: process.env.BROWSER || 'Chrome',
    Platform: process.platform
  }
};

report.generate(options);
