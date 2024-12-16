#!/usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';
import ora from 'ora';  // For loading animation
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
  .option('-g, --greet <name>', 'Greet a user', 'World')  // Define greet as part of the command
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

program.command('new <projectName>')
  .description('Create a new project')
  .action((projectName) => {
    createNewProject(projectName);
  })

  program.addCommand(
    new Command('info')
      .description('Display information about the CLI tool')
      .action(() => {
        console.log(chalk.green('veNoM CLI - A sample CLI tool with advanced features made by Vansh'));
        console.log(chalk.bgMagentaBright('More infomation go to my Github profile **VanshVala23**'));        
      })
  )

  function createNewProject(projectName: string) {
    const project = path.resolve(process.cwd(), projectName);
    if (fs.existsSync(project)) {
      console.log(chalk.red(`Project folder "${projectName}" already exists!`));
      return;
    }
    inquirer.prompt([
      {
        type:'list',
        name: 'type',
        message: 'Choose a project template:',
        choices: ['React', 'Node.js', 'TypeScript', 'None'],
      },
    ]).then((answers) => {
      console.log(chalk.green(`Creating a new project "${projectName}" with template "${answers.type}"...`));
      // Create the project folder
      fs.mkdirSync(project);
      // Add a README.md file
      fs.writeFileSync(path.join(project, 'README.md'), `# ${projectName}\n\nThis is a new project created with veNoM CLI.\n`);
      // Add a .gitignore file
      fs.writeFileSync(path.join(project, '.gitignore'), 'node_modules\n');
      if (answers.type === 'React') {
        createReactApp(project);
      }
      else if (answers.type === 'Node.js') {
        createNodeApp(project);
      }
      else if (answers.type === 'TypeScript') {
        createTypeScriptApp(project);
      }
      else {
        console.log(chalk.yellow('No template selected. Project created without any files.'));
      }
    })
  }
  function createReactApp(project: string) {
    const spinner = ora('Installing React dependencies...').start();
    // Create package.json
  const packageJson = {
    name: 'my-react-app',
    version: '1.0.0',
    description: 'A React application created by veNoM CLI',
    main: 'index.js',
    dependencies: {
      react: '^18.0.0',
      'react-dom': '^18.0.0',
    },
    scripts: {
      start: 'react-scripts start',
      build: 'react-scripts build',
      test: 'react-scripts test',
      eject: 'react-scripts eject',
    },
  };

  fs.writeFileSync(path.join(project, 'package.json'), JSON.stringify(packageJson, null, 2));

  // Create basic React component files
  const srcPath = path.join(project, 'src');
  fs.mkdirSync(srcPath);
  fs.writeFileSync(path.join(srcPath, 'index.js'), `import React from 'react';\nimport ReactDOM from 'react-dom';\n\nfunction App() {\n  return <h1>Hello, veNoM CLI React!</h1>;\n}\n\nReactDOM.render(<App />, document.getElementById('root'));`);

  // Install dependencies using npm
  try {
    execSync('npm install', { cwd: project, stdio: 'inherit' });
    spinner.succeed('React project setup complete');
  } catch (error) {
    spinner.fail('Failed to install dependencies');
    console.error(error);
  }
}
function createNodeApp(project: string) {
  const spinner = ora('Installing Node.js dependencies...').start();
  // Create package.json
  const packageJson = {
    name: 'my-node-app',
    version: '1.0.0',
    description: 'A Node.js application created by veNoM CLI',
    main: 'index.js',
    scripts: {
      start: 'node index.js',
    },
  };

  fs.writeFileSync(path.join(project, 'package.json'), JSON.stringify(packageJson, null, 2));

  // Create basic Node.js files
  fs.writeFileSync(path.join(project, 'index.js'), `console.log('Hello, veNoM CLI Node.js!');`);

  // Install dependencies using npm
  try {
    execSync('npm install', { cwd: project, stdio: 'inherit' });
    spinner.succeed('Node.js project setup complete');
  } catch (error) {
    spinner.fail('Failed to install dependencies');
    console.error(error);
  }
}
function createTypeScriptApp(project: string) {
  const spinner = ora('Installing TypeScript dependencies...').start();
  // Create package.json
  const packageJson = {
    name: 'my-typescript-app',
    version: '1.0.0',
    description: 'A TypeScript application created by veNoM CLI',
    main: 'index.js',
    scripts: {
      start: 'ts-node index.ts',
    }
  }
  fs.writeFileSync(path.join(project, 'package.json'), JSON.stringify(packageJson, null, 2));

  // Create basic TypeScript files
  const srcPath = path.join(project, 'src');
  fs.mkdirSync(srcPath);
  fs.writeFileSync(path.join(srcPath, 'index.ts'), `console.log('Hello, veNoM CLI TypeScript!');`);

  // Install dependencies using npm
  try {
    execSync('npm install typescript ts-node @types/node --save-dev', { cwd: project, stdio: 'inherit' });
    spinner.succeed('TypeScript project setup complete');
  }
  catch (error) {
    spinner.fail('Failed to install dependencies');
    console.error(error);
  }
}
// Function to display help info
function showHelpInfo() {
  console.log(chalk.green('Welcome to VeNoM CLI!'));
  console.log(chalk.blue('Use the following commands:'));
  console.log(chalk.magenta('- greet [name]    : Greet a person'));
  console.log(chalk.magenta('- version         : Show version'));
  console.log(chalk.magenta('- ascii [text]    : Display ASCII art'));
  console.log(chalk.rgb(255, 165, 0)('- exit            : Exit the terminal'));
  console.log(chalk.magenta('- info            : Display information about the CLI tool'));
}
