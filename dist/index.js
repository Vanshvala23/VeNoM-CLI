#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import ora from 'ora';
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { execSync } from 'child_process';
const program = new Command();
// Show loading spinner automatically on startup
const spinner = ora('Loading...').start();
setTimeout(() => {
    spinner.succeed('Loading complete!');
    console.log(chalk.magenta('You can use other commands now.'));
    program.parse(process.argv); // Start the command parsing after the loading spinner
}, 3000);
program
    .version('1.0.0')
    .description('veNoM CLI - A sample CLI tool with advanced features');
// Greet Command
program
    .command('greet [name]')
    .description('Greet a person with a customizable message')
    .option('-g, --greet <name>', 'Greet a user', 'World')
    .action((name, options) => {
    const message = `Hello, ${options.greet || name || 'World'}!`;
    console.log(chalk.green(message));
});
// Show Version Command
program
    .command('version')
    .description('Show version')
    .action(() => {
    console.log(chalk.blue(`veNoM CLI version: ${program.version()}`));
});
// ASCII Command to Display Text
program
    .command('ascii')
    .description('Display ASCII art with customizable text')
    .option('-t, --text <text>', 'Text to convert to ASCII art', 'Hello')
    .action((options) => {
    console.log(chalk.yellow(options.text));
});
// Help Command to display available commands
program
    .command('help')
    .description('Display help information with an ASCII art header')
    .action(() => {
    showHelpInfo();
});
// Exit Command to close the terminal
program
    .command('exit')
    .description('Exit the terminal')
    .action(() => {
    console.log(chalk.red('Goodbye! Exiting the terminal...'));
    process.exit(0);
});
// New Command to create a new project
program.command('new <projectName>')
    .description('Create a new project')
    .action((projectName) => {
    createNewProject(projectName);
});
program.addCommand(new Command('info')
    .description('Display information about the CLI tool')
    .action(() => {
    console.log(chalk.green('veNoM CLI - A sample CLI tool with advanced features made by Vansh'));
    console.log(chalk.bgMagentaBright('More information go to my Github profile **VanshVala23**'));
}));
function createNewProject(projectName) {
    const project = path.resolve(process.cwd(), projectName);
    if (fs.existsSync(project)) {
        console.log(chalk.red(`Project folder "${projectName}" already exists!`));
        return;
    }
    inquirer.prompt([{
            type: 'list',
            name: 'type',
            message: 'Choose a project template:',
            choices: ['venom-react', 'Node.js', 'TypeScript', 'None'],
        }]).then((answers) => {
        console.log(chalk.green(`Creating a new project "${projectName}" with template "${answers.type}"...`));
        // Create the project folder
        fs.mkdirSync(project);
        // Add a README.md file
        fs.writeFileSync(path.join(project, 'README.md'), `# ${projectName}\n\nThis is a new project created with veNoM CLI.\n`);
        // Add a .gitignore file
        fs.writeFileSync(path.join(project, '.gitignore'), 'node_modules\n');
        if (answers.type === 'venom-react') {
            createVenomReactApp(project, projectName);
        }
        else if (answers.type === 'Node.js') {
            createNodeApp(project, projectName);
        }
        else if (answers.type === 'TypeScript') {
            createTypeScriptApp(project, projectName);
        }
        else {
            console.log(chalk.yellow('No template selected. Project created without any files.'));
        }
    });
}
function createVenomReactApp(project, projectName) {
    const spinner = ora('Setting up venom-react app...').start();
    // Create package.json with necessary dependencies
    const packageJson = {
        name: projectName,
        version: '1.0.0',
        description: `A venom-react application created by veNoM CLI`,
        main: 'index.js',
        dependencies: {
            react: '^18.0.0',
            'react-dom': '^18.0.0',
            'react-scripts': '^5.0.1', // Add react-scripts
        },
        scripts: {
            start: 'react-scripts start',
            build: 'react-scripts build',
            test: 'react-scripts test',
            eject: 'react-scripts eject',
        },
    };
    fs.writeFileSync(path.join(project, 'package.json'), JSON.stringify(packageJson, null, 2));
    // Create essential React project structure
    const srcPath = path.join(project, 'src');
    const publicPath = path.join(project, 'public');
    fs.mkdirSync(srcPath, { recursive: true });
    fs.mkdirSync(publicPath, { recursive: true });
    // Write index.js and index.html
    fs.writeFileSync(path.join(srcPath, 'index.js'), `import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <div>Hello, ${projectName}!</div>;

ReactDOM.render(<App />, document.getElementById('root'));`);
    fs.writeFileSync(path.join(publicPath, 'index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`);
    try {
        // Install dependencies
        execSync('npm install', { cwd: project, stdio: 'inherit' });
        spinner.succeed('React project setup complete');
        console.log(chalk.green(`Project ${projectName} is ready! Run the following commands:`));
        console.log(chalk.cyan(`cd ${projectName}`));
        console.log(chalk.cyan(`npm start`));
    }
    catch (error) {
        spinner.fail('Failed to install dependencies');
        console.error(error);
    }
}
function createNodeApp(project, projectName) {
    const spinner = ora('Setting up Node.js app...').start();
    const packageJson = {
        name: projectName,
        version: '1.0.0',
        description: `A Node.js application created by veNoM CLI`,
        main: 'index.js',
        scripts: {
            start: 'node index.js',
        },
    };
    fs.writeFileSync(path.join(project, 'package.json'), JSON.stringify(packageJson, null, 2));
    fs.writeFileSync(path.join(project, 'index.js'), `console.log('Hello, ${projectName}!');`);
    try {
        execSync('npm install', { cwd: project, stdio: 'inherit' });
        spinner.succeed('Node.js project setup complete');
    }
    catch (error) {
        spinner.fail('Failed to install dependencies');
        console.error(error);
    }
}
function createTypeScriptApp(project, projectName) {
    const spinner = ora('Setting up TypeScript app...').start();
    const packageJson = {
        name: projectName,
        version: '1.0.0',
        description: `A TypeScript application created by veNoM CLI`,
        main: 'index.js',
        scripts: {
            start: 'ts-node index.ts',
        },
    };
    fs.writeFileSync(path.join(project, 'package.json'), JSON.stringify(packageJson, null, 2));
    const srcPath = path.join(project, 'src');
    fs.mkdirSync(srcPath);
    fs.writeFileSync(path.join(srcPath, 'index.ts'), `console.log('Hello, ${projectName}!');`);
    try {
        execSync('npm install typescript ts-node @types/node --save-dev', { cwd: project, stdio: 'inherit' });
        spinner.succeed('TypeScript project setup complete');
    }
    catch (error) {
        spinner.fail('Failed to install dependencies');
        console.error(error);
    }
}
function showHelpInfo() {
    console.log(chalk.green('veNoM CLI help info:'));
    console.log(' - greet: Greet someone with a customizable message');
    console.log(' - version: Display the version of veNoM CLI');
    console.log(' - ascii: Display text as ASCII art');
    console.log(' - new: Create a new project');
    console.log(' - help: Display this help information');
}
