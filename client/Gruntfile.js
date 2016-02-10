
module.exports = function ( grunt ) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-force');
  grunt.loadNpmTasks('grunt-touch');
  grunt.loadNpmTasks('grunt-jscs');

  var userConfig = require( './grunt.config.js' );

  var taskConfig = {

    pkg: grunt.file.readJSON("package.json"),
	  sass: {
      develop: {
        options: {
          style: 'expanded',
          sourcemap: 'none',
          lineNumbers: true,
          cacheLocation: 'frontend/source/grunt_assets/sass.temp/'
      
        },
        files: {
          'frontend/source/grunt_assets/sass.temp/main.css': 'frontend/source/scss/main.scss'
        }
      }
     },

 
 };

  grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );


  // Short-hand tasks
 grunt.registerTask( 'sass_develop', [
    'sass:develop'
  ]);
 
};
