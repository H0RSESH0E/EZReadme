// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const { generateMarkdown } = require('./utils/generateMarkdown');
const { getLicenseTypes } = require('./utils/generateMarkdown');
const { getLicenseText } = require('./utils/generateMarkdown');


// Inquirer function
const promptUser = (types) => {
    return inquirer.prompt([{
        type: 'input',
        name: 'title',
        message: 'What is your projects title? (required)',
        validate: title => {
            if (title) {
                return true;
            } else {
                console.log('Please enter a title.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'about',
        message: 'Please provide a description for the project:',
        validate: about => {
            if (about) {
                return true;
            } else {
                console.log('Please enter a description.');
                return false;
            }
        }
    },

    {
        type: 'confirm',
        name: 'getScreenshot',
        message: "Would you like to add a screenshot?",
        default: true
    },
    {
        type: 'input',
        name: 'screenshot',
        message: 'Provide a path and or filename for a screenshot:',
        default: './assets/images/screenshot.png',
        when: ({ getScreenshot }) => getScreenshot

    },
    {
        type: 'checkbox',
        name: 'languages',
        message: 'What languages did you use to build this project? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    
    // installation inst
    {
        type: 'input',
        name: 'install',
        message: 'What are the installation instructions for the project?',
    },
    
    // usage info
    {
        type: 'input',
        name: 'usage',
        message: 'Please enter any usage information:',
    },
    // license
    {
        type: 'list',
        name: 'licenseType',
        message: "What type of license would you like to use?",
        choices: types,
        default: 10
    },
    // What name for the liscense (Username by default or enter legal name)
    {
        type: 'confirm',
        name: 'otherName',
        message: "Would you like to sign the license with your legal name? (GitHub User name by default)",
        default: false
    },
    {
        type: 'input',
        name: 'licenseName',
        message: "Please provide a name for the license:",
        when: ({ otherName }) => otherName,
        validate: licenseName => {
            if (licenseName) {
                return true;
            } else {
                console.log('Please enter a name.');
                return false;
            }
        }
    },
    // Contribution Guidelines
    {
        type: 'input',
        name: 'contrib',
        message: 'Please enter guidelines for contribution:',
    },
    // Tests
    {
        type: 'input',
        name: 'test',
        message: 'Please enter testing details:',
    },
    {
        type: 'input',
        name: 'userName',
        message: 'What is your GitHub user name? (required)',
        validate: userName => {
            if (userName) {
                return true;
            } else {
                console.log('Please enter a user name.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What email would you like to use? (required)',
        validate: email => {
            if (email) {
                return true;
            } else {
                console.log('Please enter an email address.');
                return false;
            }
        }
    }

    ]);
}

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

// TODO: Create a function to initialize app
function init() {
    getLicenseTypes()
    .then(liscenseTypes => promptUser(liscenseTypes))
    .then(userData => {
        console.log(userData);
        getLicenseText(userData).then(
        return generateMarkdown(userData));
    })
    .then(answers => writeFile('README.md', answers))
    .catch(err => console.log(err));
 }

// Function call to initialize app
init();
