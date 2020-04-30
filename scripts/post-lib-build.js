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

  const finalRootPkgName = JSON.parse((await fs.readFile('../package.json')).toString())
  finalRootPkgName.dependencies['p3x-interceptor'] = `npm:p3x-angular-http-cache-interceptor@^${finalRootPkgName.version}`

  const finalRootPkgNameData = JSON.stringify(finalRootPkgName, null, 4)
  await fs.writeFile('../package.json', finalRootPkgNameData)

}


execAsync()
