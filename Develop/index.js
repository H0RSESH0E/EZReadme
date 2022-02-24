// TODO: Include packages needed for this application

// TODO: Create an array of questions for user input
const questions = [{
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
    when: ({ about }) => {
        if (about === 'Enter on the command line') {
            return true;
        } else {
            return false;
        }
    },
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
    default: 0
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
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Please enter a name .');
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
}
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) { }

// TODO: Create a function to initialize app
function init() { }

// Function call to initialize app
init();
