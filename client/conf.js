exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['E2E/spec.js'],
  multiCapabilities: [ {
    browserName: 'chrome'
  }],
  onPrepare: function() {
	  var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
      jasmine.getEnv().addReporter(
        new Jasmine2HtmlReporter({
          savePath: 'target/screenshots/',
		  takeScreenshots: true,
		  screenshotsFolder: 'images'
        })
      );
   }
}