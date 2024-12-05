const express = require('express');
const { markdownToBlocks } = require('@tryfabric/martian');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// API token from environment variable
const API_TOKEN = process.env.API_TOKEN;

if (!API_TOKEN) {
  console.error('API_TOKEN environment variable is required');
  process.exit(1);
}

// Middleware to parse raw body
app.use(express.text({ type: 'text/markdown' }));

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Middleware to check API token
const authenticateToken = (req, res, next) => {
  const token = req.headers['x-api-token'];

  if (!token || token !== API_TOKEN) {
    return res.status(401).json({ error: 'Invalid or missing API token' });
  }

  next();
};

// POST endpoint to convert markdown to Notion blocks
app.post('/api/markdown-to-notion', authenticateToken, (req, res) => {
  try {
    const markdown = req.body;
    
    if (!markdown) {
      return res.status(400).json({ error: 'Markdown content is required' });
    }

    const notionBlocks = markdownToBlocks(markdown, {
      notionLimits: {
        truncate: true,
        onError: (err) => {
          console.error('Notion limits error:', err);
        },
      },
      strictImageUrls: true,
    });

    res.json({ blocks: notionBlocks });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Failed to convert markdown to Notion blocks' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 