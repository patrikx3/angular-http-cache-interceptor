#!/usr/bin/env node
const fs = require('fs').promises

const execAsync = async () => {
  const rootPkgName = __dirname + '/../package.json'
  const rootPkg = require(rootPkgName)
  const pkgName = __dirname + '/../dist/angular-http-cache-interceptor/package.json'

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

  const finalRootPkg = JSON.parse((await fs.readFile(rootPkgName)).toString())
  finalRootPkg.dependencies['p3x-interceptor'] = `npm:p3x-angular-http-cache-interceptor@^${finalRootPkg.version}`

  const finalRootPkgNameData = JSON.stringify(finalRootPkg, null, 4)
  await fs.writeFile(rootPkgName, finalRootPkgNameData)

}


execAsync()
