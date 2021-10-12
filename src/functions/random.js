const fs = require('fs')

exports.handler = async (event, context) => {
  let image
  try {
    image = fs.readFileSync('./img/' + Math.floor(Math.random() * 116) + '.jpg');
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