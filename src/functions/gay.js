const fetch = require('node-fetch')
const comparisonDate = new Date(2018,10,18);


exports.handler = async (event, context) => {
  var currentDate = new Date();
  var hours = Math.abs(currentDate - comparisonDate) / 36e5;
  let image
  try {
    const result = await fetch('https://shera.gay/img/' + Math.floor(hours % 117) + '.jpg')
    image = await result.buffer()  } catch (error) {
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