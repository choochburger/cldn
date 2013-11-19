module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    dirs:
      assets: 'assets',
      css:    'public/stylesheets/',
      sass:   '<%= dirs.assets %>/sass',

    compass:
      dist:
        options:
          sassDir: '<%= dirs.sass %>',
          cssDir:  '<%= dirs.css %>'

    watch:
      sass:
        files: '<%= dirs.sass %>/*.scss',
        tasks: ['compass']


  # Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  # Default task(s).
  grunt.registerTask 'default', ['compass:dist']
