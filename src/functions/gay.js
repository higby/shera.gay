const fs = require("fs");
const comparisonDate = new Date(2018,10,18);

exports.handler = async (event, context) => {
  var currentDate = new Date();
  var hours = Math.abs(currentDate - comparisonDate) / 36e5;
  const image = fs.readFileSync("./assets/img/" + Math.floor(hours % 117) + ".jpg");
  
  return {
    statusCode: 200,
    headers: {
      'Content-type': 'image/jpg'
    },
    body: image.toString('base64'),
    isBase64Encoded: true
  }
}