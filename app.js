const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.get('/logger', (req, res) => {
    const filePath = path.join(__dirname, 'log.txt'); // Path to log.txt in the current directory

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File does not exist
            res.status(404).send('Log file not found.');
        } else {
            // File exists, set appropriate headers for download
            res.setHeader('Content-Disposition', 'attachment; filename=log.txt');
            res.setHeader('Content-Type', 'text/plain');

            // Stream the file to the response
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        }
    });
});

// Route to handle POST requests to /echo
app.post('/echo', (req, res) => {
  const requestBody = JSON.stringify(req.body);
//   console.log('Request body:', requestBody);
  console.log(`[log @${new Date().toISOString()}] ${requestBody}\n`)

  // Save the request body to a log file
  fs.appendFile('log.txt', `[${new Date().toISOString()}] ${requestBody}\n`, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
      res.status(500).send('Error writing to log file');
    } else {
      res.status(200).send('Request body saved to log file');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
