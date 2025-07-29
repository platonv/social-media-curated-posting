import dotenv from 'dotenv';

dotenv.config();

export const config = {
  openaiKey: process.env.OPENAI_API_KEY || '',
  twitter: {
    appKey: process.env.TWITTER_APP_KEY || '',
    appSecret: process.env.TWITTER_APP_SECRET || '',
    accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
    accessSecret: process.env.TWITTER_ACCESS_SECRET || '',
    callback_url: process.env.TWITTER_CALLBACK_URL || '',
    username: 'platonnvlad+twitterburner@gmail.com',
    password: 'securepassword',
  },
};
