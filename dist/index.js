#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from 'chalk';
import { Command } from 'commander';
import { getRandomJoke } from 'random-jokes';
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
// Exit Command to close the terminal
program
    .command('exit')
    .description('Exit the terminal')
    .action(() => {
    console.log(chalk.red('Goodbye! Exiting the terminal...'));
    process.exit(0);
});
// Joke Command to get a random joke
program
    .command('joke')
    .description('Get a random joke')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const joke = yield getRandomJoke();
        if (joke && joke.joke) {
            console.log(chalk.yellow(joke.joke));
        }
        else {
            console.log(chalk.red('Failed to fetch a joke.'));
        }
    }
    catch (error) {
        console.log(chalk.red('Error fetching joke:', error));
    }
}));
// Function to display help info
function showHelpInfo() {
    console.log(chalk.green('Welcome to VeNoM CLI!'));
    console.log(chalk.blue('Use the following commands:'));
    console.log(chalk.magenta('- greet [name]    : Greet a person'));
    console.log(chalk.magenta('- version         : Show version'));
    console.log(chalk.magenta('- ascii [text]    : Display ASCII art'));
    console.log(chalk.rgb(255, 165, 0)('- exit            : Exit the terminal'));
    console.log(chalk.cyan('- joke            : Get a random joke'));
}
