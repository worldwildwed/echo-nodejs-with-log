// const mySwitch = require('./app.json');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());


app.get('/status', (req, res) => {
  const mySwitch = JSON.parse(fs.readFileSync('app.json', 'utf-8'));
  console.log('[ get status ]', req.ip, req.get('User-Agent'));
  if (mySwitch.status == 'prod') {
    res.status(200).send(true);
  } else {
    res.status(400).send(false);
  }
})

app.post('/changeStatus', (req, res) => {
  const requestBody = req.body;
  // console.log(requestBody)
  // console.log(requestBody.status)
  if (requestBody.status == 'prod') {
    fs.writeFile('app.json', JSON.stringify({status: "prod"}, null, 4), 'utf8', (err) => {
    if (err) throw err;
    console.log('app.json has been updated');
  });
  }
  else {
    fs.writeFile('app.json', JSON.stringify({status: "notprod"}, null, 4), 'utf8', (err) => {
    if (err) throw err;
    console.log('app.json has been updated');
  });
  }
  res.status(200).send('OKAY');
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
