// Packages needed for this application
const axios = require("axios");

// Object to transfer data between the functions of this module
var licenseUrlObj = {};

const getLicenseTypes = async () => {

    const licenseUrl = `https://api.github.com/licenses`;
    const licenseData = [];
    const licenseTypes = [];

    const response = await axios.get(licenseUrl);
    for (var i = 0; i < response.data.length; i++) {
        const tempArr = [];
        tempArr.push(response.data[i].name);
        tempArr.push(response.data[i].url);
        licenseData.push(tempArr);
        licenseTypes.push(response.data[i].name);
    }

    licenseUrlObj = Object.fromEntries(licenseData);

    let none = "-- No License --";
    licenseTypes.push(none);
    return licenseTypes;
};

const getLicenseText = async (userDataObj) => {

    const { licenseType } = userDataObj;

    if (licenseType === "-- No License --") {
        return "";
    } else {  
    const licenseUrl = licenseUrlObj[licenseType];
    const response = await axios.get(licenseUrl);

    var { body, description } = response.data;

    userDataObj.fullLicenseText = body;
    userDataObj.licenseDescription = description;

    return userDataObj;
    }
};

module.exports = {
    getLicenseTypes,
    getLicenseText
}