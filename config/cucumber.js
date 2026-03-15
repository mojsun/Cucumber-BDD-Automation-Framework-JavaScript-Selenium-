module.exports = {
  default: {
    require: ['step-definitions/**/*.js', 'support/**/*.js'],
    requireModule: [],
    format: [
      'progress',
      'json:reports/cucumber-report.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    paths: ['features/**/*.feature'],
    timeout: 60000
  }
};
