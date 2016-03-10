module.exports = function ( karma ) {
  karma.set({

    basePath: '../../',

    files: [
      'vendor/bower/underscore/underscore.js',
      'vendor/bower/angular/angular.js',
      'vendor/bower/angular-sanitize/angular-sanitize.js',
      'vendor/bower/angular-ui-router/release/angular-ui-router.js',
      'grunt_assets/html2js.temp/app/templates-app.js',
      'grunt_assets/html2js.temp/app/templates-common.js',
      'vendor/bower/angular-mocks/angular-mocks.js',
      'common/route-config-service/route-config.js',
      'common/route-config-service/services/route-config-service.js',
      'app/home/home.js',
      'app/app.js',
      'app/route.js',
      'app/app/controllers/app-controller.js',
      'app/home/controllers/home-controller.js',
      'app/home/services/home-service.js',
      'app/home/_tests/home-service.spec.js',
      
    ],
    frameworks: [ 'jasmine' ],
    plugins: [ 'karma-jasmine', 'karma-firefox-launcher', 'karma-chrome-launcher', 'karma-phantomjs-launcher', 'karma-coverage' ],
    reporters: ['progress', 'coverage', 'dots'],

//	    reporters: ['dots'],
    port: 9877,
    runnerPort: 9878,
    urlRoot: '/',
     /**
     * 'PhantomJS', 'Chrome', 'Opera', 'Safari', 'Firefox', 'ChromeCanary'
     */
    browsers: [
      'Chrome'//, 'Chrome', 'Opera', 'Safari', 'Firefox', 'ChromeCanary'
    ],
	 preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)

            'app/**/**/**/*service.js': ['coverage'],
			  'app/**/**/**/*factory.js': ['coverage'],
			
        },
	   // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,
	 // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'grunt_assets/coverage/',

        },
		 // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
		   // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
  });
};

