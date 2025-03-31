const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Store messages in memory (for development)
// In a real app, you'd use a database
let messages = [];

// Create a submissions.json file if it doesn't exist
const submissionsFile = path.join(__dirname, 'submissions.json');

if (!fs.existsSync(submissionsFile)) {
  fs.writeFileSync(submissionsFile, '[]');
}

// Load existing messages
try {
  const data = fs.readFileSync(submissionsFile, 'utf8');
  messages = JSON.parse(data);
} catch (err) {
  console.error('Error reading submissions file:', err);
}

// Submit endpoint
app.post('/submit', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const newMessage = {
    id: Date.now(),
    message,
    timestamp: new Date().toISOString()
  };

  messages.push(newMessage);

  // Save to file
  fs.writeFile(submissionsFile, JSON.stringify(messages, null, 2), (err) => {
    if (err) console.error('Error saving submission:', err);
  });

  res.status(200).json({ success: true });
});

// View all messages (for debugging)
app.get('/messages', (req, res) => {
  res.json(messages);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Access the form at http://localhost:3000`);
});