#!/usr/bin/env node
const fs = require('fs').promises

const execAsync = async () => {
  const rootPkgName = require('../package.json')
  const pkgName = __dirname + '/../release/angular-http-cache-interceptor/package.json'

  let pkg = require(pkgName)
  pkg.devDependencies = pkg.devDependencies || {}
  pkg.name = rootPkgName.name
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
  const data = JSON.stringify(pkg, null, 4)
  await fs.writeFile(pkgName, data)
}


execAsync()
