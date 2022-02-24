const licenses = require('./licenses.js');

const gHuserLink = (userName) => {
    return `https://github.com/${userName}`
}

const gHuserPic = (userName) => {
    return `https://github.com/${userName}.png`
}

function markdownData (userResponsesObject) {

    const { title, description, screenshot, install, usage, contrib, test, license, licenseName, lBadge, userName, email } = userResponsesObject;

    
    return `
# <Your-Project-Title>${title}
## An application by ${userName} 
&nbsp;
${lBadge}
## Description
${description}
&nbsp;
![${title}](${screenshot})

##Table of Contents
### [Installation](#installation)  - [Usage](#usage) - [License](#license) - [Contributing](#contributing) - [Tests](#tests) - [Questions](#questions)
&nbsp;
## Installation
${install}
## Usage
${usage}
## License
// Place Brief License Info with link to license file
${licenses.getLicenseText(license, licenseName)}
## Contributing
${contrib}
## Tests
${test}
## Questions
![brand](${gHuserPic(userName)})
**${gHuserLink(userName)}**
Please direct any questions about the application or concerns about how to contribute to development to me by email: **${email}**
    `
}


module.exports = markdownData;