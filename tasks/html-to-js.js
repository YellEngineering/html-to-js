/*
 * html-to-js
 * https://github.com/45629Ar/grunt
 *
 * Copyright (c) 2018 Arshdeep Soni
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('html-to-js', 'Converts HTML template files to JS', function() {
    // build options and save against grunt instance (this)
    const options = this.options({
      template: 'grunt-configs/html-to-js.tmpl',
      ext: '.js',
    });


    // read template from template path
    const template = grunt.file.read(options.template);
    
    // loop through folders and find files
    this.files.forEach(function(f) {
      f.src.forEach(function(filepath, index) {
        let contents = grunt.file.read(filepath)
        
        // replacement
        contents = contents.replace(/\\/g, '\\\\')
                           .replace(/'/g, "\\'")
                           .replace(/\r?\n|\r|\t/g, '');
    
        // process template into output
        let output = grunt.template.process(template, { 
          data: { html: contents } 
        })

        // replace multiple spaces with single space
        output = output.replace(/  +/g, ' ');

        // gets extension from string with '.' at the start 
        let fullExtension = '.' + filepath.split(".").splice(1).join('.');

        // new filename with desired extension
        let newFilename = filepath.replace(fullExtension, fullExtension + options.ext);
        
        // write to destination
        grunt.file.write(newFilename, output, {
          encoding: 'utf-8'
        });

      });
    });

  });

};
