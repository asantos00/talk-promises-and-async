const fs = require('fs');

// Promisified utility
const promisifiedReadFile = (file, encoding)  => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, encoding, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    })
  });
}

promisifiedReadFile('./yo.txt', 'utf-8')
  .then((data) => {
    console.log('Promisified data', data)
  })
  .then(() => {
    console.log('Cenas da vida')
  });

fs.readFile('./yo.txt', 'utf-8', function(err, data) {
    console.log('Normal data', data)
});
