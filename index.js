// Packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const config = require('./package.json');
const chalk = require('chalk');

// Application specific modules
const { getLicenseTypes, getLicenseText } = require('./utils/apiCalls');
const { renderFullLicenseText } = require('./utils/genLicenseTxts');
const { generateMarkdown } = require('./utils/genReadMe');
const { writeFile } = require('./utils/writeFile');
const { checkAndMakeDirectory } = require('./utils/mkdir');

// Database variable
const { languages } = require('./utils/languages');

// keystroke saving variable
const log = console.log;

// Splash screen configuration object for ASCIart-logo module
const titles = {
    name: 'EZ README',
    font: 'Star Wars',
    lineChars: 18,
    padding: 2,
    margin: 1,
    borderColor: 'white',
    logoColor: 'yellow',
    textColor: 'purple'
};

// Configuration function for Inquirer module
const promptUser = (types, languages) => {
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
        choices: languages
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
};

// Initialization function
function init() {
    getLicenseTypes()
        .then(liscenseTypes => promptUser(liscenseTypes, languages))
        .then(userDataObj => getLicenseText(userDataObj))
        .then(userDataObj => renderFullLicenseText(userDataObj))
        .then(userDataObj => {
            checkAndMakeDirectory();
            writeFile('./LICENSE/license.txt', userDataObj.fullLicenseText)
                .then(writeFileResponse => {
                    log("");
                    writeFileResponse.ok ? log(chalk.black.bgGreen(writeFileResponse.message)) : log(chalk.black.bgRed(writeFileResponse.message));

                });
            return userDataObj;
        })
        .then(userDataObj => generateMarkdown(userDataObj))
        .then(response => writeFile('README.md', response))
        .then(writeFileResponse => {
            log("");
            writeFileResponse.ok ? log(chalk.black.bgGreen(writeFileResponse.message)) : log(chalk.black.bgRed(writeFileResponse.message));
        })
        .catch(err => console.log(err));
}

// Splash Screen
log(logo(titles).emptyLine().right(`${config.description}`).emptyLine().right(`Ver.: ${config.version}`).render());

// Function call to initialize app
init();
