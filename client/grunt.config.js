
module.exports = {
 app_files: {
    js: [
      'frontend/source/common/*/*.js',
      'frontend/source/common/**/*.js',
      '!frontend/source/common/**/*.spec.js',

      'frontend/source/app/*/*.js',
      'frontend/source/app/app.js',
      'frontend/source/app/*/**/*.js',
      '!frontend/source/app/**/*.spec.js',
    ],
    jsunit: [ 'frontend/source/app/**/*.spec.js' ],

    atpl: [ 'frontend/source/app/**/*.tpl.html' ],
    ctpl: [ 'frontend/source/common/**/*.tpl.html' ]
 },
 vendor_files: {
     js_header: [
     ],
     cdn_header: [],

     js_footer: [
       'frontend/source/vendor/bower/underscore.string/dist/underscore.string.js'
     ],
     cdn_footer: [
     ],

     assets: [
     ]
 },
};
