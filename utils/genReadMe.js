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
    let validString = licenseType.replace('-', '_')
    return `[<img src='https://img.shields.io/badge/license-${validString}-blueviolet' alt="user avatar" height="20"/>](#license)`
}

const renderLicenseContent = fullLicenseText => {
    var trimmedBody = fullLicenseText.substring(0, 250);
    return `
${trimmedBody}  
    [ . . . Click here to view the full license attached to this project.](license.txt)`
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

function generateMarkdown(userResponsesObject) {

    var { title, about, screenshot, languages, install, usage, licenseType, otherName, licenseName, contrib, test, userName, email, fullLicenseText } = userResponsesObject;
    userName = userName.trim();
    return `
# ${title}
## An application by ${userName}  
&nbsp;  
${renderLicBadge(licenseType)}  
&nbsp;&nbsp;  
## Table of Contents
#### [Description](#description)  -  [Installation](#installation)  -  [Usage](#usage) - [License](#license) - [Contributing](#contributing) - [Tests](#tests) - [Questions](#questions)
&nbsp;  
## Description  
${about}  
&nbsp;  
${renderScreenshot(screenshot, title)}  
${renderLanguageBadges(languages)}  
&nbsp;  
## Installation
${install}  
&nbsp;  
## Usage
${usage}  
&nbsp;  
## License  
${renderLicenseContent(fullLicenseText)}  
&nbsp;  
## Contributing
${contrib}  
&nbsp;  
## Tests
${test}  
&nbsp;  
## Questions
Questions or concerns about the project or how to contribute to its development can be emailed to: **${email}**  
&nbsp;  
&nbsp;  
![](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)  
<img src="${renderGhUserPic(userName)}" alt="user avatar" width="100"/>  
**[Visit me on GitHub](${renderGhUserLink(userName)})**  
`
}

module.exports = { generateMarkdown }