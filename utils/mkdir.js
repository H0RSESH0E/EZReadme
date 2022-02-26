var fs = require('fs');
const checkAndMakeDirectory = () => {
var dir = './LICENSE';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
};

module.exports = { checkAndMakeDirectory};