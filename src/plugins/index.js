module.exports = config => {
  // ------------ Filters ------------
  config.addPlugin(require(`./filters/uriEncode`))

  // ------------ Internal ------------
  config.addPlugin(require(`./styles`))
}
