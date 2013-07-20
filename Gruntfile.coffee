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
      files: ["src/**.js"]

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
      unit:
        configFile: 'karma.conf.js',
        autoWatch: true

    sass:
      dist:
        files:
          'public/styles/css/main.css': 'public/styles/sass/main.scss'

    watch:
      css:
        files: ['public/styles/sass/*.scss']
        tasks: ['sass']

    connect: 
      server: 
        options: 
          port: 9001
          keepalive: true
        
  # Load external Grunt task plugins.
  @loadNpmTasks "grunt-contrib-jshint"
  @loadNpmTasks "grunt-karma"
  @loadNpmTasks "grunt-contrib-yuidoc"
  @loadNpmTasks "grunt-contrib-connect"
  @loadNpmTasks "grunt-contrib-sass"
  @loadNpmTasks "grunt-contrib-watch"

  # Default task.
  @registerTask "default", ["jshint", "yuidoc", "karma"]
