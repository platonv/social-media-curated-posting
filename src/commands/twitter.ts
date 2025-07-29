import { Command } from 'commander';
import OpenAI from 'openai';
import { config } from '../config';
import { loginToTwitter, postToTwitter } from '../services/twitter';
import { createServer } from './server';

const commandAction = async () => {
    console.log("Testing Twitter API...");
    console.log(config.openaiKey);

    postToTwitter({
        content: 'This is a test tweet from the CLI tool!',
    }).then(() => {
        console.log('Tweet posted successfully!');
    });
}

export function loginCommand(program: Command) {
    program
        .command('login')
        .description('Login to Twitter (starts server automatically)')
        .option('-p, --port <port>', 'Port to run server on', '3000')
        .action(async (options) => {
            try {
                console.log('🚀 Starting OAuth server...');
                await createServer(options.port);
                
                console.log('📱 Initiating Twitter login...');
                await loginToTwitter();
            } catch (error) {
                console.error('Login failed:', error);
                process.exit(1);
            }
        });
}


export function twitterCommand(program: Command) {
    program
        .command('twitter')
        .description('Post a test tweet to Twitter')
        .action(commandAction);
}