const axios = require("axios");

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
}

const getLicenseText = async (userDataObj) => {
    var today = new Date();
    var date = today.getFullYear();

    const { licenseType } = userDataObj;

    if (licenseType === "-- No License --") {
        return "";
    } else {  
    const licenseUrl = licenseUrlObj[licenseType];
    const response = await axios.get(licenseUrl);

    var { body } = response.data;

    userDataObj.fullLicenseText = body;

    return userDataObj;
    }
}

module.exports = {
    getLicenseTypes,
    getLicenseText
}