const inquirer = require('inquirer');
const genReadMe = require('./src/template');
const licenses = require('./src/licenses.js');
const { writeFile } = require('./utils/generate-file');

// const licenseTypes = [];
// console.log(licenseTypes);

const promptUser = () => {
    return inquirer.prompt([

        // Project Title

        {
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

        // description
        // {
        //     type: 'list',
        //     name: 'descriptType',
        //     message: "How would you prefer to enter the project's description?",
        //     choices: ['Enter on the command line', 'Use my default editor'],
        //     default: 0,
        // },
        // {
        //     type: 'editor',
        //     name: 'about',
        //     message: "Please provide the projects' description",
        //     when: ({ descriptType }) => {
        //         if (descriptType === 'Use my default editor') {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     },
        //     validate: about => {
        //         if (about) {
        //             return true;
        //         } else {
        //             console.log('Please enter a title.');
        //             return false;
        //         }
        //     }
        // },
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
            choices: ['holder', 'holders', 'holding'],
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
        },

    ]);
};

    const types = [];
    licenses.getTypes()
    .then(answers => types = answers)
    .then(console.log(types))
    .then(promptUser());