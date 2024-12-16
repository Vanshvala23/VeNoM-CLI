# VeNoM-CLI

VeNoM-CLI is a command-line tool built with **Node.js** and **TypeScript** for performing system operations, automating tasks, and providing real-time diagnostics. The tool includes various features, including random joke generation, file operations, and system monitoring.

## Features
- File operations: copy, move, delete, etc.
- Network diagnostics and system monitoring.
- Joke generator using **random-jokes** API.
- Real-time system monitoring and task automation.
- Easy-to-use CLI interface built with **Inquirer.js**.

## Technologies Used
- **Node.js** - Runtime environment.
- **TypeScript** - For strong typing and better code structure.
- **random-jokes** - For generating jokes.
- **Inquirer.js** - For interactive CLI prompts.

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   mkdir venom-cli
   cd venom-cli
   git clone https://github.com/Vanshvala23/VeNoM-CLI
   cd VeNoM-CLI
2. **Install the dependencies**:
   ```bash
   npm install
3. **Run the code**:
   ```bash
   npx venom.tsx[options]

## Available Commands
- **greet** - Greet a person with a customizable message.
- **version** - Gets the current version of cli.
- **exit** - Terminates the cli with "Good bye Message".
- **jokes** - Randomly tells the jokes.
