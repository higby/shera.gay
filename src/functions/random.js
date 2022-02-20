const fs = require("fs");

exports.handler = async (event, context) => {
  const image = fs.readFileSync("./src/assets/img/" + Math.floor(Math.random() * 116) + ".jpg");
  
  return {
    statusCode: 200,
    headers: {
      'Content-type': 'image/jpg'
    },
    body: image.toString('base64'),
    isBase64Encoded: true
  }
}