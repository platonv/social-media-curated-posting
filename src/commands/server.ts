import { Command } from 'commander';
import express, { Request, Response } from 'express';
import { TwitterApi } from 'twitter-api-v2';
import { config } from '../config';
import { getPendingOAuthTokens, clearPendingOAuthTokens } from '../services/twitter';
import { Server } from 'http';

export function createServer(port: string = '3000'): Promise<Server> {
    return new Promise((resolve, reject) => {
        const app = express();

        // Twitter OAuth callback endpoint
        app.get('/twitter_callback', async (req: Request, res: Response) => {
            try {
                const { oauth_token, oauth_verifier } = req.query;
                const pendingTokens = getPendingOAuthTokens();

                console.log (oauth_token, oauth_verifier, pendingTokens);

                if (!oauth_token || !oauth_verifier || !pendingTokens) {
                    return res.status(400).send('Missing OAuth parameters or tokens. Make sure you run the login command first.');
                }

                const twitterClient = new TwitterApi({
                    appKey: config.twitter.appKey,
                    appSecret: config.twitter.appSecret,
                    accessToken: oauth_token as string,
                    accessSecret: pendingTokens.oauth_token_secret,
                });

                const { accessToken, accessSecret } = await twitterClient.login(oauth_verifier as string);

                const authenticatedClient = new TwitterApi({
                    appKey: config.twitter.appKey,
                    appSecret: config.twitter.appSecret,
                    accessToken,
                    accessSecret,
                });

                const user = await authenticatedClient.v1.verifyCredentials();

                console.log(`\n✅ Successfully authenticated: @${user.screen_name} (${user.id_str})`);
                console.log(`📝 Access Token: ${accessToken}`);
                console.log(`🔐 Access Secret: ${accessSecret}`);
                console.log(`\n💡 Save these tokens to your .env file:`);
                console.log(`TWITTER_ACCESS_TOKEN=${accessToken}`);
                console.log(`TWITTER_ACCESS_SECRET=${accessSecret}`);
                
                res.send(`
                    <h1>🎉 Twitter Authentication Successful!</h1>
                    <p>Logged in as: <strong>@${user.screen_name}</strong></p>
                    <p>✅ You can close this window and return to the CLI.</p>
                    <p>💡 Check your terminal for your access tokens.</p>
                `);

                // Clear pending tokens
                clearPendingOAuthTokens();

            } catch (error) {
                console.error('Twitter callback error:', error);
                res.status(500).send(`
                    <h1>❌ Authentication Failed</h1>
                    <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
                    <p>Please try the login process again.</p>
                `);
            }
        });

        const server = app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
            console.log(`Twitter callback URL: http://localhost:${port}/twitter_callback`);
            resolve(server);
        });

        server.on('error', reject);
    });
}

export function serverCommand(program: Command) {
    program
        .command('server')
        .description('Start Express server for OAuth callbacks')
        .option('-p, --port <port>', 'Port to run server on', '3000')
        .action(async (options) => {
            try {
                await createServer(options.port);
            } catch (error) {
                console.error('Failed to start server:', error);
                process.exit(1);
            }
        });
}