#!/usr/bin/env node
const fs = require('fs').promises

const execAsync = async () => {
  const rootPkg = require('../package.json')
  const pkgName = __dirname + '/../release/angular-http-cache-interceptor/package.json'

  let pkg = require(pkgName)
  pkg.devDependencies = pkg.devDependencies || {}
  pkg.name = rootPkg.name
  pkg.devDependencies['corifeus-builder'] = rootPkg.devDependencies['corifeus-builder']
  pkg.corifeus = {
    publish: true
  }

  delete rootPkg.devDependencies
  delete rootPkg.dependencies
  delete rootPkg.corifeus
  delete rootPkg.scripts
  delete rootPkg.private
  pkg = Object.assign(pkg, rootPkg)
  const data = JSON.stringify(pkg, null, 4)
  await fs.writeFile(pkgName, data)

  const finalRootPkg = JSON.parse((await fs.readFile('../package.json')).toString())
  finalRootPkg.dependencies['p3x-interceptor'] = `npm:p3x-angular-http-cache-interceptor@^${finalRootPkg.version}`

  const finalRootPkgNameData = JSON.stringify(finalRootPkg, null, 4)
  console.log(finalRootPkgNameData)
  await fs.writeFile('../package.json', finalRootPkgNameData)

}


execAsync()
