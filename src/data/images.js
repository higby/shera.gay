const fs = require('fs/promises')
const Image = require('@11ty/eleventy-img')

module.exports = async () => {
  let images = await fs.readdir('src/assets/images')

  images.forEach((file, i) => {
    Image(`./src/assets/images/${file}`, {
      formats: ['avif', 'webp', 'jpeg'],
      urlPath: '/images',
      outputDir: './build/images/',
      filenameFormat: (id, src, width, format, options) => `${i}.${format}`
    })
  })

  return images
}
