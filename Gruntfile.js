module.exports = function(grunt) {
  "use strict";

  function readOptionalJSON( filepath ) {
    var data = {};
    try {
        data = grunt.file.readJSON( filepath );
    } catch ( e ) {}
        return data;
    }

var srcHintOptions = readOptionalJSON( "src/.jshintrc" );

  // The concatenated file won't pass onevar
  // But our modules can
  delete srcHintOptions.onevar;

  // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            build: {
                src: "src/**/*.js",
                dest: 'dist/<%= pkg.name %>.js',
                nonull: true
            }
        },
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            all: {
                src: [
                    "src/**/*.js", 
                    "Gruntfile.js", 
                    "test/**/*.js",
                    "!dist/**/*.min.js"
                ],
                options: {
                  jshintrc: true
                }
            },
            dist: {
                src: "dist/<%= pkg.name %>.min.js",
                options: srcHintOptions
            }
        },
        watch: {
            files: [ "<%= jshint.all.src %>" ],
            tasks: ['jshint:all', 'concat']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask( "lint", [ "jshint" ] );
    grunt.registerTask( "build", [ "jshint:all", "concat", "uglify", "jshint:dist" ] );

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify']);

};
