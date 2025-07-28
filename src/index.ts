#!/usr/bin/env node
import { Command } from 'commander';
import { loadCommand } from './commands/test';

const program = new Command();
program
.name('typescript-cli-tool')
.description('A powerful CLI tool built with TypeScript')
.version('1.0.0');

loadCommand(program);

program.parse(process.argv);