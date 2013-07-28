/*
 * grunt-contrib-tslint
 * https://github.com/palantir/grunt-contrib-tslint
 *
 * Copyright (c) 2013 Ashwin Ramaswamy
 * Licensed under the Apache license.
 */

'use strict';

module.exports = function(grunt) {

  var Linter = require("tslint");

  grunt.registerMultiTask('tslint', 'A linter for TypeScript.', function() {
    var options = this.options({
      formatter: "prose"
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      f.src.forEach(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
        } else {
          var contents = grunt.file.read(filepath);
          var linter = new Linter(filepath, contents, options);

          var result = linter.lint();

          if(result.failureCount > 0) {
            grunt.log.write(result.output);
            return false;
          }
        }
      });
    });
  });

};