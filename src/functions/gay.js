const fs = require('fs')
const currentDate = new Date();
const comparisonDate = new Date(2018,10,18);
const hours = Math.abs(currentDate - comparisonDate) / 36e5;

exports.handler = async (event, context) => {
  let image
  try {
    image = fs.readFileSync('./img/' + Math.floor(hours % 117) + '.jpg');
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