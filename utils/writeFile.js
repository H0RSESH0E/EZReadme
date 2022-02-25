const fs = require('fs');

// TODO: Create a function to write README file
const writeFile = (fileName, fileContent) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(`${fileName}`, fileContent, err => {
        if (err) {
          reject(err);
          return;
        }
  
        resolve({
          ok: true,
          message: `${fileName} was created and saved in this folder.`
        });
      });
    });
  };

  module.exports = { writeFile };