# Grunt configuration updated to latest Grunt.  That means your minimum
# version necessary to run these tasks is Grunt 0.4.
#
# Please install this locally and install `grunt-cli` globally to run.
module.exports = ->

  # Initialize the configuration.
  @initConfig
    pkg: @file.readJSON('package.json')
    # Lint source, node, and test code with some sane options.
    jshint:
      files: ["src/**/*.js"]

      # Allow certain options.
      options:
        browser: true
        boss: true
        immed: false
        eqnull: true
        globals: {}

    # Generate documentation with YUI doc
    yuidoc:
      compile:
        name: '<%= pkg.name %>'
        description: '<%= pkg.description %>'
        version: '<%= pkg.version %>'
        url: '<%= pkg.homepage %>'
        options:
          paths: './'
          outdir: 'docs'

    karma:
      options:
        configFile: 'karma.conf.js',
        browsers: ['Chrome', 'PhantomJS']
      dev:
        reporters: ['dots']
        autoWatch: true
      continuous:
        singleRun: true,
        browsers: ['PhantomJS']
      'coverage-text':
        singleRun: true,
        reporters: ['coverage'],
        coverageReporter:
          type : 'text',
          dir: 'coverage'
      'coverage-html':
        singleRun: true,
        reporters: ['coverage'],
        coverageReporter:
          type : 'html',
          dir: 'coverage'

    sass:
      dist:
        files:
          'dev/styles/css/main.css': 'dev/styles/sass/main.scss'

    watch:
      css:
        files: ['public/styles/sass/*.scss']
        tasks: ['sass']

    connect: 
      server: 
        options: 
          port: 9001
          keepalive: true

    clean:
      debug: ['dist/js', 'dist/styles']
      release: ['_release/**/*', '!_release/.git']

    requirejs: {
      compile: {
        options: {
          baseUrl: 'src/js',
          mainConfigFile: 'src/js/config.js',
          out: 'dist/js/source.js',
          include: ['initialize', 'app'],
          optimize: 'none',
          name: 'main',
          wrap: true
        }
      }
    }

    # Minify the application built source and generate source maps back to
    # the original debug build.
    uglify:
      options:
        sourceMap: "dist/js/source.js.map",
        sourceMappingURL: "source.js.map"
        sourceMapRoot: "",
        sourceMapPrefix: 2,
        preserveComments: "some"

      release:
        files:
          "dist/js/source.js": ["dist/js/source.debug.js"]

    # Combine the Almond AMD loader and precompiled templates with the
    # application source code.
    concat:
      js:
        src: [
          "bower_components/almond/almond.js",
          "dist/js/source.js"
        ]
        dest: "dist/js/source.js",
        separator: ";"
      styles:
        src: [
          "bower_components/normalize-css/normalize.css",
          "dev/styles/css/bootstrap.min.css",
          "dev/styles/css/main.css"
        ]
        dest:
          "dist/styles/css/index.css"

    compress:
      release:
        files:
          "dist/js/source.js.gz": "dist/js/source.js",
          "dist/styles/css/index.css.gz": "dist/styles/css/index.css"

    cssmin:
      release:
        files:
          "dist/styles/css/index.css": ["dist/styles/css/index.css"]

    copy:
      debug:
        files: [
          { expand: true, flatten: true, src: ["dev/styles/img/**"], dest: "dist/styles/img/", filter: 'isFile' }
        ]
      map:
        files: [
          { src: ["dist/js/source.js"], dest: "dist/js/source.debug.js" }
        ]
      release:
        files: [
          { expand: true, cwd: "dist", src: ["**"], dest: "_release/" }
        ]

  # Load external Grunt task plugins.
  @loadNpmTasks "grunt-contrib-jshint"
  @loadNpmTasks "grunt-karma"
  @loadNpmTasks "grunt-contrib-yuidoc"
  @loadNpmTasks "grunt-contrib-connect"
  @loadNpmTasks "grunt-contrib-sass"
  @loadNpmTasks "grunt-contrib-watch"
  @loadNpmTasks "grunt-contrib-requirejs"
  @loadNpmTasks "grunt-contrib-clean"
  @loadNpmTasks "grunt-contrib-concat"
  @loadNpmTasks "grunt-contrib-copy"
  @loadNpmTasks "grunt-contrib-cssmin"
  @loadNpmTasks "grunt-contrib-compress"
  @loadNpmTasks "grunt-contrib-uglify"

  # Default task.
  @registerTask "default", ["jshint", "yuidoc", "karma"]

  # Build project into "dist" dir, without compressing/minifying.
  @registerTask "debug", ["clean:debug", "jshint", "requirejs", "concat:js", "concat:styles", "copy:debug"]

  # Take dist, minify and compress and copy to _release dir.
  @registerTask "release", ["debug", "clean:release", "cssmin:release", "copy:map", "uglify", "compress", "copy:release"]
