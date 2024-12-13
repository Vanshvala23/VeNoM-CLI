#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import ora from 'ora'; // For loading animation
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
    .option('-g, --greet <name>', 'Greet a user', 'World') // Define greet as part of the command
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
// Function to display help info
function showHelpInfo() {
    console.log(chalk.green('Welcome to VeNoM CLI!'));
    console.log(chalk.blue('Use the following commands:'));
    console.log(chalk.magenta('- greet [name]    : Greet a person'));
    console.log(chalk.magenta('- version         : Show version'));
    console.log(chalk.magenta('- ascii [text]    : Display ASCII art'));
}
