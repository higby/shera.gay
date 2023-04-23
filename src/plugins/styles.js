const fs = require('fs')
const sass = require('sass')

async function compileSASS(data) {
  return sass.compileString(data, {
    style: 'compressed',
    loadPaths: [`./src/assets/styles/`]
  }).css
}

module.exports = config => {
  config.addGlobalData('styles', async () => {
    return compileSASS(fs.readFileSync('./src/assets/styles/etheria.scss', 'utf8'))
  })

  config.addPlugin(require('@11ty/eleventy-plugin-bundle'), {
    bundles: ['stylesheet', 'javascript'],
    transforms: [
      async function (content) {
        if (this.type === 'stylesheet') {
          return compileSASS(content)
        }
        return content
      }
    ]
  })
}
