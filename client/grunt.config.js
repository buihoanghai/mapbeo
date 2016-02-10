
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
};
