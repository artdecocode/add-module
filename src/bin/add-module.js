#!/usr/bin/env node
import read from '@wrote/read'
import write from '@wrote/write'

(async () => {
  const packageJson = await read('package.json')
  const { version, module: m } = JSON.parse(packageJson)
  if (m) {
    console.log('Package already contains the module')
    return
  }
  const v = version.replace(/\d+$/, (p) => {
    const vv = parseInt(p) + 1
    return vv
  })
  const newPackage = packageJson
    .replace(/( +)"main".+/m, (main, ws) => {
      return `${main}\n${ws}"module": "src/index.js",`
    })
    .replace(/"version": ".+?"/, `"version": "${v}"`)
  await write('package.json', newPackage)
  const sl = await read('CHANGELOG.md')
  console.log(v)
})()