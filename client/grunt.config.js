
module.exports = {
 app_files: {
    js: [
      'frontend/source/common/*/*.js',
      'frontend/source/common/**/*.js',
      '!frontend/source/common/**/*.spec.js',

      'frontend/source/app/*/*.js',
      'frontend/source/app/app.js',
      'frontend/source/app/*/**/*.js',
      '!frontend/source/app/**/*.spec.js'
    ],
    jsunit: [ 'frontend/source/app/**/*.spec.js' ],

    atpl: [ 'frontend/source/app/**/*.tpl.html' ],
    ctpl: [ 'frontend/source/common/**/*.tpl.html' ]
 },
  test_files: {
    js: [ 'client/source/vendor/bower/angular-mocks/angular-mocks.js' ]
  },

 vendor_files: {
     js_header: [
     ],
     cdn_header: [],

     js_footer: [
       'frontend/source/vendor/bower/underscore.string/dist/underscore.string.js',
         'frontend/source/vendor/bower/angular/angular.js',
         'frontend/source/vendor/bower/angular-local-storage/dist/angular-local-storage.js',
         'frontend/source/vendor/bower/angular-resource/angular-resource.js',
         'frontend/source/vendor/bower/angular-sanitize/angular-sanitize.js',
         'frontend/source/vendor/bower/angular-ui-router/release/angular-ui-router.js',
     ],
     cdn_footer: [
     ],

     assets: [
     ]
 },
};
