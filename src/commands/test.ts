import { Command } from 'commander';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const commandAction = async () => {
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


export function loadCommand(program: Command) {
    program
        .command('test')
        .description('Test command for demonstration')
        .action(commandAction);
}