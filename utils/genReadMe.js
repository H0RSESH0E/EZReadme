const { langShieldsObj } = require('./languages');


const renderScreenshot = (screenshot, title) => {
    return screenshot ? `<img src="${screenshot}" alt="${title} application screenshot" width="600"/>  ` : '';
  }
  

// format GitHub details user pic
const renderGhUserPic = (userName) => {
    return `https://github.com/${userName}.png`
}

const renderGhUserLink = (userName) => {
    return `https://github.com/${userName}`
}

const renderLicBadge = (licenseType) => {

    return `[<img src="https://img.shields.io/badge/license-${licenseType}-blueviolet" alt="user avatar" height="20"/>](#license)`
}

const renderLicenseContent = fullLicenseText => {
    var trimmedBody = fullLicenseText.substring(0, 500);
    return `
    ${trimmedBody}  
    [Full License Text](license.txt)`
  }

const renderLanguageBadges = languages => {
    var shieldsArr = langShieldsObj();
    var markdownToReturn = '';
    for (var i = 0; i < languages.length; i++) {      
        markdownToReturn +=
        `${shieldsArr[languages[i]]} `;
    }
    return markdownToReturn;
}

function generateMarkdown (userResponsesObject) {

    const { title, about, screenshot, languages, install, usage, licenseType, otherName, licenseName, contrib, test, userName, email, fullLicenseText } = userResponsesObject;
  console.log(licenseType);
    return `
  # <Your-Project-Title>${title}
  ## An application by ${userName} 
  &nbsp;&nbsp;
  ## Description  
  ${about}  
  &nbsp;  
  ${renderLicBadge(licenseType)}  
  &nbsp;  
  ${renderScreenshot(screenshot, title)}  
  ${renderLanguageBadges(languages)}  
  ## Table of Contents
  ### [Installation](#installation)  - [Usage](#usage) - [License](#license) - [Contributing](#contributing) - [Tests](#tests) - [Questions](#questions)
  &nbsp;
  ## Installation
  ${install}
  ## Usage
  ${usage}
  ## License
  ${licenseType}  
  ${renderLicenseContent(fullLicenseText)}  
  ## Contributing
  ${contrib}
  ## Tests
  ${test}
  ## Questions
  Please direct any questions about the application or concerns about how to contribute to its development to me by email:  
  **${email}**  
  &nbsp;  
  <img src="${renderGhUserPic(userName)}" alt="user avatar" width="60"/>  
  **${renderGhUserLink(userName)}**
    `
}
  
module.exports = { generateMarkdown }