// Service that posts curated content to Twitter
import { TwitterApi } from 'twitter-api-v2';
import { config } from '../config';

const twitterClient = new TwitterApi({
  appKey: config.twitter.appKey,
  appSecret: config.twitter.appSecret,
  accessToken: config.twitter.accessToken,
  accessSecret: config.twitter.accessSecret,
});

type TwitterPost = {
    content: string;
    imageUrl?: string;
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