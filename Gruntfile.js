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

  // The concatenated file won"t pass onevar
  // But our modules can
  delete srcHintOptions.onevar;

  // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n",
                sourceMap: true
            },
            build: {
                files: {
                    "dist/<%= pkg.name %>.min.js": [
                        "src/tracking.js",
                        "src/addEventListener-polyfill.js",
                        "src/events.js"
                    ]
                },
                options: {
                    sourceMap: true
                }
            }
        },
        jshint: {
            all: {
                src: [
                    "src/**/*.js",
                    "!src/addEventListener-polyfill.js",
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
            tasks: ["jshint:all", "uglify"],
            options: {
                livereload: true
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask( "lint", [ "jshint" ] );
    grunt.registerTask( "build", [ "jshint:all", "uglify", "jshint:dist" ] );

    // Default task(s).
    grunt.registerTask("default", [ "uglify" ]);

};
