#!/usr/bin/env node
const fs = require('fs').promises
const path = require('path')

const execAsync = async() => {

  try {
    const rootPkgName = require('../package.json')
    const pkgName = `${__dirname}/../release/angular-http-cache-interceptor/package.json`

    let pkg = require(pkgName)
    pkg.devDependencies = {}
    pkg.devDependencies['corifeus-builder'] = rootPkgName.devDependencies['corifeus-builder']
    pkg.corifeus = {
      publish: true
    }

    delete rootPkgName.devDependencies
    delete rootPkgName.dependencies
    delete rootPkgName.corifeus
    delete rootPkgName.scripts
    delete rootPkgName.private
    pkg = Object.assign(pkg, rootPkgName)

    await fs.writeFile(pkgName, JSON.stringify(pkg, null, 4))

  } catch (e) {
    console.error(e)
    process.exit(-1)
  }


}

execAsync()
