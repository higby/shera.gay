const fetch = require('node-fetch')

exports.handler = async (event, context) => {

  let image
  try {
    const result = await fetch('https://shera.gay/img/' + Math.floor(Math.random() * 116) + '.jpg')
    image = await result.buffer()
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Content-type': 'image/jpg'
    },
    body: image.toString('base64'),
    isBase64Encoded: true
  }
}
