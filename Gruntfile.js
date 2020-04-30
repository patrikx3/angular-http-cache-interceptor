const utils = require('corifeus-utils');
const path = require('path')
const fs = require('fs').promises

module.exports = (grunt) => {

  const builder = require(`corifeus-builder`);
  const loader = new builder.loader(grunt);
  loader.js({
    replacer: {
      type: 'p3x',
      npmio: true,
    },
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

  grunt.registerTask('hook-lib', async function () {
    const done = this.async();

    try {
      const rootPkgName = require('./package.json')
      const pkgName = path.resolve(`./projects/angular-http-cache-interceptor/package.json`)

      let pkg = require(pkgName)
      pkg.devDependencies = pkg.devDependencies || {}
      pkg.name = rootPkgName.name
      pkg.devDependencies['corifeus-builder'] = rootPkgName.devDependencies['corifeus-builder']
      pkg.corifeus = {
        publish: true,
        install: false
      }

      delete rootPkgName.devDependencies
      delete rootPkgName.dependencies
      delete rootPkgName.corifeus
      delete rootPkgName.scripts
      delete rootPkgName.private
      pkg = Object.assign(pkg, rootPkgName)
      const data = JSON.stringify(pkg, null, 4)
      await fs.writeFile(pkgName, data)
      done()

    } catch (e) {
      console.error(e)
      done(e)
    }
  });

  const defaultTask = builder.config.task.build.js.concat(['hook-lib'])
  grunt.registerTask('default', defaultTask );


}
