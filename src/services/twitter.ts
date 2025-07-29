// Service that posts curated content to Twitter
import { TwitterApi } from 'twitter-api-v2';
import { config } from '../config';
import open from 'open';

console.log(config.twitter);

const twitterClient = new TwitterApi({
  appKey: config.twitter.appKey, appSecret: config.twitter.appSecret,
});

// Global storage for OAuth tokens during auth flow
let pendingOAuthTokens: { oauth_token: string; oauth_token_secret: string } | null = null;

type TwitterPost = {
    content: string;
    imageUrl?: string;
}

export async function loginToTwitter(): Promise<void> {
    try {
        console.log('Starting Twitter OAuth flow...');
        console.log('Make sure the server is running with: npm run dev server');

        const authLink = await twitterClient.generateAuthLink(config.twitter.callback_url, {});
        
        // Store the OAuth tokens for later use in callback
        pendingOAuthTokens = {
            oauth_token: authLink.oauth_token,
            oauth_token_secret: authLink.oauth_token_secret
        };

        console.log('Opening browser for Twitter authentication...');
        console.log('Auth URL:', authLink.url);
        
        // Open the browser to the Twitter auth page
        await open(authLink.url);
        
        console.log('Please complete the authentication in your browser.');
        console.log('The callback will be handled at:', config.twitter.callback_url);
    } catch (error) {
        console.error('Error starting Twitter login:', error);
    }
}

export function getPendingOAuthTokens() {
    return pendingOAuthTokens;
}

export function clearPendingOAuthTokens() {
    pendingOAuthTokens = null;
}

export async function postToTwitter(content: TwitterPost): Promise<void> {
    try {
        const { content: tweetContent, imageUrl } = content;

        if (imageUrl) {
            // Upload media and post a tweet with media
            const mediaId = await twitterClient.v1.uploadMedia(imageUrl);
            await twitterClient.v1.tweet(tweetContent, { media_ids: mediaId });
        } else {
            // Post a simple tweet
            await twitterClient.v1.tweet(tweetContent);
        }

        console.log('Tweet posted successfully!');
    } catch (error) {
        console.error('Error posting to Twitter:', error);
    }
}