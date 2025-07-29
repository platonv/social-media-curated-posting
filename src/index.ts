#!/usr/bin/env node
import { Command } from 'commander';
import { testCommand } from './commands/test';
import { twitterCommand, loginCommand } from './commands/twitter';
import { serverCommand } from './commands/server';
import figlet from 'figlet';

console.log(figlet.textSync('Social Media Curated Poster'))

const program = new Command();
program
.name('typescript-cli-tool')
.description('A powerful CLI tool built with TypeScript')
.version('1.0.0');

testCommand(program);
loginCommand(program);
twitterCommand(program);
serverCommand(program);

program.parse(process.argv);