#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var commander_1 = require("commander");
var ora_1 = require("ora"); // For loading animation
var program = new commander_1.Command();
// Show loading spinner automatically on startup
var spinner = (0, ora_1.default)('Loading...').start();
setTimeout(function () {
    spinner.succeed('Loading complete!');
    console.log(chalk_1.default.magenta('You can use other commands now.'));
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
    .action(function (name, options) {
    var message = "Hello, ".concat(options.greet || name || 'World', "!");
    console.log(chalk_1.default.green(message));
});
// Show Version Command
program
    .command('version')
    .description('Show version')
    .action(function () {
    console.log(chalk_1.default.blue("veNoM CLI version: ".concat(program.version())));
});
// ASCII Command to Display Text
program
    .command('ascii')
    .description('Display ASCII art with customizable text')
    .option('-t, --text <text>', 'Text to convert to ASCII art', 'Hello')
    .action(function (options) {
    console.log(chalk_1.default.yellow(options.text));
});
// Help Command to display available commands
program
    .command('help')
    .description('Display help information with an ASCII art header')
    .action(function () {
    showHelpInfo();
});
// Exit Command to close the terminal
program
    .command('exit')
    .description('Exit the terminal')
    .action(function () {
    console.log(chalk_1.default.red('Goodbye! Exiting the terminal...'));
    process.exit(0);
});
program.addCommand(new commander_1.Command('info')
    .description('Display information about the CLI tool')
    .action(function () {
    console.log(chalk_1.default.green('veNoM CLI - A sample CLI tool with advanced features made by Vansh'));
    console.log(chalk_1.default.bgMagentaBright('More infomation go to my Github profile **VanshVala23**'));
}));
// Function to display help info
function showHelpInfo() {
    console.log(chalk_1.default.green('Welcome to VeNoM CLI!'));
    console.log(chalk_1.default.blue('Use the following commands:'));
    console.log(chalk_1.default.magenta('- greet [name]    : Greet a person'));
    console.log(chalk_1.default.magenta('- version         : Show version'));
    console.log(chalk_1.default.magenta('- ascii [text]    : Display ASCII art'));
    console.log(chalk_1.default.rgb(255, 165, 0)('- exit            : Exit the terminal'));
    console.log(chalk_1.default.magenta('- info            : Display information about the CLI tool'));
}
