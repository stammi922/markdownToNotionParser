# Markdown to Notion API

A simple API service that converts Markdown to Notion-compatible blocks using the @tryfabric/martian package.

## Features

- Convert Markdown to Notion API blocks
- API token authentication
- Environment variable configuration
- Ready for deployment on Render.com

## Prerequisites

- Node.js 14 or higher
- npm (Node Package Manager)
- Git

## Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd markdown-to-notion-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Edit the `.env` file and set your API token:
```
API_TOKEN=your-secret-api-token
PORT=3000
```

5. Start the server:
```bash
npm start
```

The API will be available at `http://localhost:3000`

## API Usage

### Convert Markdown to Notion Blocks

**Endpoint:** `POST /api/markdown-to-notion`

**Headers:**
- `Content-Type: text/markdown`
- `x-api-token: your-secret-api-token`

**Body:** Raw markdown text

**Example Request:**
```bash
curl -X POST \
  http://localhost:3000/api/markdown-to-notion \
  -H 'Content-Type: text/markdown' \
  -H 'x-api-token: your-secret-api-token' \
  -d '# Hello World

This is a **test** with _italic_ text.

* List item 1
* List item 2'
```

### Health Check

**Endpoint:** `GET /health`

Returns the API health status.

## Deployment on Render.com

1. Push your code to a Git repository (GitHub, GitLab, etc.)

2. Sign up or log in to [Render.com](https://render.com)

3. Create a new Web Service:
   - Click "New +"
   - Select "Web Service"
   - Connect your repository

4. Configure the Web Service:
   - Name: Choose a name for your service
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: Select appropriate plan (Free tier works for testing)

5. Add Environment Variable:
   - Click "Environment" tab
   - Add environment variable:
     - Key: `API_TOKEN`
     - Value: Your secure API token

6. Click "Create Web Service"

Your API will be deployed and available at the URL provided by Render.

## Environment Variables

- `API_TOKEN`: Your secret API token for authentication
- `PORT`: Port number (default: 3000)

## Security Considerations

1. Never commit the `.env` file to version control
2. Use a strong, unique API token
3. In production, always use HTTPS
4. Consider implementing rate limiting for production use

## Error Handling

The API returns appropriate HTTP status codes:

- `200`: Successful conversion
- `400`: Invalid request (missing markdown)
- `401`: Invalid or missing API token
- `500`: Server error during conversion

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
[MIT](LICENSE)
