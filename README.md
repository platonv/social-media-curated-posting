# Social Media Curated Posting

A REST API service for posting content to social media platforms with AI-powered content moderation to reject inappropriate content.

## Overview

This project provides a secure and responsible way to post content to social media platforms by:
- **AI Content Moderation**: Automatically screens content for inappropriate material before posting
- **Multi-platform Support**: Currently supports Twitter/X with plans for additional platforms
- **OAuth Authentication**: Secure authentication flow for social media platforms
- **REST API**: Simple HTTP endpoints for easy integration

## Features

- 🤖 **AI-Powered Content Filtering**: Uses OpenAI to analyze and reject inappropriate content
- 🐦 **Twitter Integration**: Full OAuth flow and posting capabilities
- 🔒 **Secure Authentication**: OAuth implementation for Twitter
- 🚀 **Easy Setup**: Simple CLI commands for authentication and testing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Twitter Developer Account
- OpenAI API Key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd social-media-curated-posting
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
OPENAI_API_KEY=your_openai_api_key
TWITTER_APP_KEY=your_twitter_app_key
TWITTER_APP_SECRET=your_twitter_app_secret
TWITTER_CALLBACK_URL=http://<your_url>/twitter_callback
```

### Twitter Setup

Your server should be accessible from the internet for Twitter's OAuth callback. You can use tools like [ngrok](https://ngrok.com) to expose your local server.

1. Create a Twitter Developer Account at [developer.twitter.com](https://developer.twitter.com)
2. Create a new app and get your App Key and App Secret
3. Set the callback URL to `http://<your_url>/twitter_callback`

### Authentication

Authenticate with Twitter using the CLI:

```bash
# Build the project
npm run build

# Start the OAuth flow (starts server automatically)
npm run run login
```

This will:
1. Start a local server on port 3000
2. Open your browser to Twitter's authentication page
3. Handle the OAuth callback
4. Display your access tokens

Save the access tokens to your `.env` file:
```env
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_SECRET=your_access_secret
```

## Usage

### CLI Commands

```bash
# Authenticate with Twitter
npm run dev login

# Post a test tweet
npm run dev twitter

# Run tests
npm run dev test
```

### API Endpoints (Coming Soon)

The REST API will provide endpoints for:
- `POST /api/post` - Post content to social media with AI moderation
- `GET /api/health` - Health check endpoint
- `POST /api/moderate` - Content moderation endpoint

## Content Moderation

The AI content filter checks for:
- Hate speech and harassment
- Adult content
- Spam and misleading information
- Violence and threats
- Copyright infringement concerns

Content that violates these guidelines will be rejected before posting.

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Run tests
npm test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Security

This project is designed for defensive security and content moderation purposes only. It will not assist with creating, modifying, or improving code that may be used maliciously.

## Support

For issues and questions, please create an issue in the GitHub repository.