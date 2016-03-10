
module.exports = function (grunt) {

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

    var userConfig = require('./grunt.config.js');

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
        clean: {
            options: {
                'no-write': false
            },
            develop: {
                src: ["frontend/dist/develop/*"]
            },
			index_scripts_temp: { src: [ '<%= index_scripts.develop_header.result_dir %>' ] },
			sass_temp: { src: [ '<%= sass.develop.options.cssDir %>' ] },
			index_temp: { src: [ 'frontend/source/grunt_assets/index.temp/' ] }
        },
        copy: {
            develop_assets: {
                src: ['**'],
                dest: 'frontend/dist/develop/assets/',
                cwd: 'frontend/source/assets/',
                expand: true,
                rename: function (dest, src) {

                    var name = src.substring(0, src.lastIndexOf("."));
                    var type = src.substring(src.lastIndexOf(".") + 1);
                    var ver = grunt.config('pkg.version');

                    if (name && type) {
                        src = [name, ver, type].join(".");
                    }

                    return dest + src;
                }
            },
            develop_index: {
                options: {
                    rename: false,
                    process: function (contents, srcpath) {
                        return grunt.template.process(contents, {
                            data: {
                                version: grunt.config('pkg.version')
                            }
                        });
                    },
                },
                files: [
                  {
                      src: ['index.html'],
                      dest: 'frontend/dist/develop/',
                      cwd: 'frontend/source/grunt_assets/index.temp/',
                      expand: true
                  }
                ]
            },
            develop_css: {
                src: ['main.css'],
                dest: 'frontend/dist/develop/assets/',
                cwd: 'frontend/source/grunt_assets/sass.temp/',
                expand: true,
                rename: function (dest, src) {
                    var ver = grunt.config('pkg.version');
                    return dest + "client." + ver + ".css";
                },
                options: {
                    process: function (contents, srcpath) {
                        return grunt.template.process(contents, {
                            data: {
                                version: grunt.config('pkg.version')
                            }
                        });
                    }
                }
            },
            develop_appjs: {
                src: ['<%= app_files.js %>'],
                dest: 'frontend/dist/develop/assets/js/',
                expand: true,
                rename: function (dest, src) {
                    var name = src.substring(0, src.lastIndexOf("."));
                    var type = src.substring(src.lastIndexOf(".") + 1);
                    var ver = grunt.config('pkg.version');
                    var cwd = "frontend/source/";

                    // Remove cwd from name
                    var _check = name.substring(0, cwd.length);
                    if (_check == cwd) {
                        name = name.substring(cwd.length);
                    }

                    if (name && type) {
                        src = [name, ver, type].join(".");
                    }

                    return dest + src;
                }
            },
            develop_vendorjs: {
                src: ['<%= vendor_files.js_header %>', '<%= vendor_files.js_footer %>'],
                dest: 'frontend/dist/develop/assets/js/',
                expand: true,
                rename: function (dest, src) {
                    var name = src.substring(0, src.lastIndexOf("."));
                    var type = src.substring(src.lastIndexOf(".") + 1);
                    var ver = grunt.config('pkg.version');
                    var cwd = "frontend/source/";

                    // Remove cwd from name
                    var _check = name.substring(0, cwd.length);
                    if (_check == cwd) {
                        name = name.substring(cwd.length);
                    }

                    if (name && type) {
                        src = [name, ver, type].join(".");
                    }

                    return dest + src;
                }
            },
            develop_html2js: {
                src: ['<%= html2js.app.dest %>', '<%= html2js.common.dest %>'],
                dest: 'frontend/dist/develop/assets/js/app/',
                expand: true,
                flatten: true,
                rename: function (dest, src) {
                    var name = src.substring(0, src.lastIndexOf("."));
                    var type = src.substring(src.lastIndexOf(".") + 1);
                    var ver = grunt.config('pkg.version');

                    if (name && type) {
                        src = [name, ver, type].join(".");
                    }

                    return dest + src;
                }
            },
        },
        html2js: {
            options: {
                base: 'frontend/source/',
                process: function (contents, srcpath) {
                    return grunt.template.process(contents, {
                        data: {
                            version: grunt.config('pkg.version')
                        }
                    });
                },
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                    removeEmptyAttributes: true
                }
            },

            app: {
                src: ['<%= app_files.atpl %>'],
                dest: 'frontend/source/grunt_assets/html2js.temp/app/templates-app.js'
            },
            common: {
                src: ['<%= app_files.ctpl %>'],
                dest: 'frontend/source/grunt_assets/html2js.temp/app/templates-common.js'
            }
        },

        index_scripts: {
            develop_header: {
                dir: 'frontend/source/',
                result_dir: 'frontend/source/grunt_assets/index.scripts.temp/',
                file: 'grunt_assets/index.scripts.header.html',
                base: 'frontend/source/',

                cdn: ['<%= vendor_files.cdn_header %>'],
                src: ['<%= vendor_files.js_header %>']
            },
            develop_footer: {
                dir: 'frontend/source/',
                result_dir: 'frontend/source/grunt_assets/index.scripts.temp/',
                file: 'grunt_assets/index.scripts.footer.html',
                base: 'frontend/source/',

                cdn: ['<%= vendor_files.cdn_footer %>'],
                files: [
                  {
                      src: ['<%= vendor_files.js_footer %>', '<%= app_files.js %>']
                  },
                  {
                      cwd: 'frontend/source/grunt_assets/html2js.temp/',
                      src: ['**/templates-*.js'],
                      dest: 'app/'
                  }
                ]
            }
        },
        includereplace: {
            index: {
                options: {
                    includesDir: '<%= index_scripts.develop_header.result_dir %>'
                },
                files: {
                    'frontend/source/grunt_assets/index.temp/index.html': ['frontend/source/index.html']
                }
            }
        },
        jshint: {
            options: {
                jshintrc: true,
                force: true
            },

            app: ['<%= app_files.js %>'],
            unit: ['<%= app_files.jsunit %>']
        },

		karmaconfig: {
		  unit: {
			source: 'frontend/source/grunt_assets/karma-unit.tpl.js',
			target_dir: 'frontend/source/grunt_assets/karma.temp/',
			target_name: 'karma-unit.js',
			base: 'frontend/source/',
			cdn: [
			  '<%= vendor_files.cdn_header %>',
			  '<%= vendor_files.cdn_footer %>',
			],
			src: [
			  '<%= vendor_files.js_header %>',
			  '<%= vendor_files.js_footer %>',
			  'frontend/source/grunt_assets/html2js.temp/**/templates-*.js',
			  '<%= test_files.js %>',
			  '<%= app_files.js %>',
			  '<%= app_files.jsunit %>'
			]
		  }
    },
		karma_run: {
		  options: {
			configFile: '<%= karmaconfig.unit.target_dir %><%= karmaconfig.unit.target_name %>',
			 runnerPort: 9999,
					browsers: ['Chrome']
		  },
		  unit: {
			background: true,
			port: 9877
		  },
		  continuous: {
			background: false,
			singleRun: false,
			port: 9877
		  },
		  dev: {
					reporters: 'dots'
				}
    },
    watch: {
      options: {
        spawn: false
      },

      app_js: {
        files: [ '<%= app_files.js %>' ],
        tasks: [ 'index_develop',
                 'copy:develop_appjs',
			//	 'karma:unit:run' 
				 ]
      },

      app_unit: {
        files: [ '<%= app_files.jsunit %>' ],
        tasks: [ /*, 'karma:unit:run'*/ ],
        options: {
          spawn: false
        }
      },

      assets: {
        files: [ 'frontend/source/assets/**/*' ],
        tasks: [ 'copy:develop_assets' ], 
      },

      index: {
        files: [
          'frontend/source/index.html',
          'frontend/source/grunt_assets/index.scripts.*.html'
        ],
        tasks: [ 'index_develop' ],       
      },

      tpls: {
        files: [ '<%= app_files.atpl %>', '<%= app_files.ctpl %>' ],
        tasks: [ 'html2js', 'copy:develop_html2js' ],      
      },

      scss: {
        files: [ 'frontend/source/**/*.scss', 'frontend/source/**/*.sass' ],
        tasks: [ 'sass_develop' ],    
      },

        grunt_config: {
        files: [ 'grunt.config.js' ],
        tasks: [ 'develop_core' ],
      }
    }



    };
	
	 grunt.renameTask( 'karma', 'karma_run' );
	 
    grunt.registerTask( 'karma', [ 'karmaconfig', 'karma_run:continuous', 'karma_run:unit'] );
    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    //Test tasks
	
	 grunt.registerTask( 'index_develop', [
    'index_scripts:develop_header', 'index_scripts:develop_footer',
    'includereplace:index', 'copy:develop_index',
    'clean:index_scripts_temp', 'clean:index_temp'
  ]);
   grunt.registerTask( 'sass_develop', [
    'sass:develop', 'copy:develop_css'
  ]);
   grunt.registerTask( 'develop_core', [
    'clean:develop', 'html2js', 'copy:develop_html2js',
    'copy:develop_assets', 'sass_develop', 'copy:develop_appjs',
    'copy:develop_vendorjs', 'index_develop'
  ]);
    grunt.registerTask('develop', [
       'develop_core',
		 'watch'
    ]);
    // Short-hand tasks



    grunt.registerMultiTask('index_scripts', 'Process scripts for index.html', function () {

        var ver = grunt.config('pkg.version');
        var base = this.data.base;

        // Add version number to filenames
        var scripts = this.filesSrc.map(function (file) {
            // Remove base from file
            if (base) {
                var _check = file.substring(0, base.length);
                if (_check == base) {
                    file = file.substring(base.length);
                }
            }

            var name = file.substring(0, file.lastIndexOf("."));
            var type = file.substring(file.lastIndexOf(".") + 1);

            if (name.substring(name.length - ver.toString().length) == ver) {
                return [name, type].join(".");
            }
            else {
                return [name, ver, type].join(".");
            }
        });

        var cdn = this.data.cdn[0];

        var file = this.data.file;
        var source = this.data.dir + this.data.file;
        var target = this.data.result_dir + file;

        grunt.file.copy(source, target, {
            process: function (contents, path) {
                grunt.log.writeln("Adding " + scripts.length.toString().cyan + " scripts to " + file);
                grunt.log.writeln("Adding " + cdn.length.toString().cyan + " cdn-scripts to " + file);
                return grunt.template.process(contents, { data: { scripts: scripts, cdn: cdn } });
            }
        });
    });
	 grunt.registerMultiTask( 'karmaconfig', 'Process karma config templates', function () {
		var base = this.data.base;
		var scripts = this.filesSrc.map(function (file) {
		  // Remove base from file
		  var _check = file.substring(0, base.length);
		  if (_check == base) {
			file = file.substring(base.length);
		  }
		  return file;
		});

		var source  = this.data.source;
		var name    = this.data.target_name;
		var target  = this.data.target_dir + '/' + name;

		var cdn = this.data.cdn[0].concat(this.data.cdn[1]);

		grunt.file.copy( source, target, {
		  process: function ( contents, path ) {
			grunt.log.writeln( "Adding " + scripts.length.toString().cyan + " scripts to " + name );
			grunt.log.writeln( "Adding " + cdn.length.toString().cyan + " cdn-scripts to " + name );
			return grunt.template.process( contents, {
			  data: {
				scripts: scripts,
				cdn: cdn
			  }
			});
		  }
		});
	  });


};