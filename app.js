const mySwitch = require('./app.json');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

console.log('My Switch:', mySwitch);
// Middleware to parse JSON request bodies
app.use(bodyParser.json());


app.get('/status', (req, res) => {
  if (mySwitch.status == 'prod') {
    res.status(200).send(true);
  } else {
    res.status(400).send(false);
  }
})
// Route to handle POST requests to /echo
app.post('/echo', (req, res) => {
  const requestBody = JSON.stringify(req.body);
//   console.log('Request body:', requestBody);
  console.log(`[log @${new Date().toISOString()}] ${requestBody}\n`)

  // // Save the request body to a log file
  // fs.appendFile('log.txt', `[${new Date().toISOString()}] ${requestBody}\n`, (err) => {
  //   if (err) {
  //     console.error('Error writing to log file:', err);
  //     res.status(500).send('Error writing to log file');
  //   } else {
  //     res.status(200).send('Request body saved to log file');
  //   }
  // });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
