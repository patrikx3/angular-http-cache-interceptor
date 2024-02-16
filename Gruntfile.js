const utils = require('corifeus-utils');
const path = require('path')
const fs = require('fs').promises

module.exports = (grunt) => {

  const builder = require(`corifeus-builder`);
  const loader = new builder.loader(grunt);
  loader.js({
    replacer: {
      type: 'p3x',
    },
    config: {
      htmlmin: {
        dist: {
          options: {                                 // Target options
            removeComments: true,
            collapseWhitespace: true,
            minifyCSS: true,
          },
          files: {
            './dist/workspace/index.html': './dist/workspace/index.html'
          }
        }
      },
    }
  });


  grunt.registerTask('publish', async function () {
    const done = this.async();

    try {
      await builder.utils.spawn({
        grunt: grunt,
        gruntThis: this,
      }, {
        cmd: 'npm',
        args: [
          'run',
          'build-lib',
        ]
      });
      done()
    } catch (e) {
      done(e)
    }

  });

  grunt.registerTask('build', async function () {
    const done = this.async();

    try {
      await builder.utils.spawn({
        grunt: grunt,
        gruntThis: this,
      }, {
        cmd: 'npm',
        args: [
          'run',
          'build-app',
        ]
      });
      done()
    } catch (e) {
      done(e)
    }

  });

  const defaultTask = builder.config.task.build.js.concat(['cory-angular-hook-lib', 'cory-raw-npm-angular', 'build', 'htmlmin:dist'])
  grunt.registerTask('default', defaultTask);


}
