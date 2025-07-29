import { Command } from 'commander';
import OpenAI from 'openai';
import { config } from '../config';

const client = new OpenAI({
    apiKey: config.openaiKey,
});

const commandAction = async () => {
    console.log("Testing OpenAI API...");
    console.log(config.openaiKey);

    const response = await client.moderations.create({
        model: 'omni-moderation-latest',
        input: 'Heil Hitler',
    });

    console.log(response);

    response.results.forEach((result) => {
        console.log(`Flagged: ${result.flagged}`);
        console.log(`Categories: ${JSON.stringify(result.categories, null, 2)}`);
        console.log(`Category scores: ${JSON.stringify(result.category_scores, null, 2) }`);
    });

    console.log('Ping');
}


export function testCommand(program: Command) {
    program
        .command('test')
        .description('Test command for demonstration')
        .action(commandAction);
}