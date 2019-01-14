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
    .replace(/"files": \[([\s\S]+?)\s+\]/, (_, files) => {
      return `"files": [${files},\n    "src"\n  ]`
    })
  await write('package.json', newPackage)
  const cl = await read('CHANGELOG.md')
  const d = new Date()
  const dd = `## ${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`
  const cll = cl.startsWith(dd) ? cl.replace(`${dd}\n\n`, '') : cl
  const c = `${dd}

### ${v}

- [package] Add the "module" field

${cll}`
  await write('CHANGELOG.md', c)
})()

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']