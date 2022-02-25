const axios = require("axios");

var licenseUrlObj = {};


// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
//returns the license types
const getLicenseTypes = async () => {
 
  const licenseUrl = `https://api.github.com/licenses`;
  const licenseData = [];
  const licenseTypes = [];

  const response = await axios.get(licenseUrl);
  for (var i = 0; i < response.data.length; i++){
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

//return the license text
const getLicenseText = async (userName, licenseName, licenseType) => {
  var today = new Date();
  var date = today.getFullYear();

  licenseName ? licenseName : licenseName = userName;

  console.log("here it is ", licenseName);

  const licenseUrl = licenseUrlObj[licenseType];

  const response = await axios.get(licenseUrl);

  var { body } = response.data;
  var updatedBody;
  updatedBody = body.replace('[year]', `${date}`);
  updatedBody = updatedBody.replace('[fullname]', `${licenseName}`);

  console.log(updatedBody);
  return updatedBody;
}

const trimLicenseContent = fullLicenseText => {
  var trimmedBody = fullLicenseText.substring(0, 500);
  return `
  ${trimmedBody}  
  [Full License Text](license.txt)`
}
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// format GitHub details user pic
const gHuserPic = (userName) => {
  return `https://github.com/${userName}.png`
}

const gHuserLink = (userName) => {
  return `https://github.com/${userName}`
}

const renderScreenshot = (screenshot, title) => {
  return screenshot ? `<img src="${screenshot}" alt="${title} application screenshot" width="600"/>  ` : '';
}

const renderLicense = (licenseType) => {

return `[<img src="https://img.shields.io/badge/license-${licenseType}-brightgreen" alt="user avatar" height="20"/>](#license)  `
}

// TODO: Create a function to generate markdown for README
function generateMarkdown (userResponsesObject) {

  const { title, about, screenshot, languages, install, usage, licenseType, otherName, licenseName, contrib, test, userName, email } = userResponsesObject;


  
  return `
# <Your-Project-Title>${title}
## An application by ${userName} 
&nbsp;&nbsp;
## Description
${about}  
&nbsp;  
${renderLicense(licenseType)}  
&nbsp;  
${renderScreenshot(screenshot, title)}  
## Table of Contents
### [Installation](#installation)  - [Usage](#usage) - [License](#license) - [Contributing](#contributing) - [Tests](#tests) - [Questions](#questions)
&nbsp;
## Installation
${install}
## Usage
${usage}
## License
${licenseType}  
${getLicenseText(userName, licenseName, licenseType)}  
## Contributing
${contrib}
## Tests
${test}
## Questions
Please direct any questions about the application or concerns about how to contribute to its development to me by email:  
**${email}**  
&nbsp;  
<img src="${gHuserPic(userName)}" alt="user avatar" width="60"/>  
**${gHuserLink(userName)}**
  `
}

module.exports = {
  generateMarkdown,
  gHuserLink,
  gHuserPic,
  getLicenseTypes,
};
