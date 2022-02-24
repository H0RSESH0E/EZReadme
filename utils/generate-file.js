const fs = require('fs');

// writing files
const writeFile = (fileName, fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`./dist/${fileName}`, fileContent, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: `${fileName} was created and saved in the "dist" subfolder.`
      });
    });
  });
};

module.exports = { writeFile };
