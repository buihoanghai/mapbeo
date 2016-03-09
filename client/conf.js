exports.config = {
    // Note: setting up seleniumAddress will override settings for seleniumServerJar, seleniumPort and seleniumArgs
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    seleniumServerJar: 'C:/Users/teamcity/AppData/Roaming/npm/node_modules/protractor/selenium/selenium-server-standalone-2.47.1.jar',
    seleniumPort: 4444,
    seleniumArgs: [],

    params:
    {
        baseurl: 'https://develop.penetrace.com/home/index.html#/',
    },
    capabilities: {
        browserName: 'chrome'
    },
    onPrepare: function () {
        requirePage = function (name) {
            return require(__dirname + '/spec/e2e/' + name);
        };
        requireLib = function (name) {
            return require(__dirname + '/spec/e2e/' + name);
        };
        getBaseUrl = function () {
            return browser.params.baseurl;
        };

        var jasmineReporters = require('jasmine-reporters');
        return browser.getProcessedConfig().then(function (config) {
            var browserName = config.capabilities.browserName;

            var nunitReporter = new jasmineReporters.NUnitXmlReporter({
                consolidateAll: true,
                savePath: 'testresults',
                filePrefix: browserName + '-xmloutput',
                modifySuiteName: function (generatedSuiteName, suite) {
                    return browserName + '.' + generatedSuiteName;
                }
            });
            jasmine.getEnv().addReporter(nunitReporter);
        });
    },
    suites: {
        //e2e: 'spec/e2e/**/*.spec.js',
        //fullScreen : 'spec/e2e/trendMonitor/fullScreen/*.spec.js'
        topic: ['spec/e2e/trendMonitor/edit/**/*.spec.js', 'spec/e2e/trendMonitor/fullScreen/*.spec.js']
    },
    framework: 'jasmine2',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 120000
    },
    restartBrowserBetweenTests: false
};
