const axios = require("axios");

const getTypes = async () => {
 
    const licenseUrl = `https://api.github.com/licenses`;

    const response = await axios.get(licenseUrl);

    const licenseTypes = [];

    for (var i = 0; i < response.data.length; i++){
        licenseTypes.push(response.data[i].name);
    }
    console.log("From licenses.js: ", licenseTypes);
    return licenseTypes;
}

async function getLicenseText(licenseKey, licenseName) {
 
    const licenseUrl = `https://api.github.com/licenses/${licenseKey}`;

    const response = await axios.get(licenseUrl);

    const { body } = response.data;

    const updatedBody = body.replace('[year], [fullname]', `${today.getFullYear()}, ${licenseName}`);

    return updatedBody;
}


module.exports = {
    getTypes, 
    getLicenseText
}