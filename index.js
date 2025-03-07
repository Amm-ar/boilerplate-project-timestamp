// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { query } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// app.get('/api/:year-:month-:day', (req, res) => {
app.get('/api/:date', (req, res) => {
  let queryDate = new Date(req.params.date);
  if (queryDate == "Invalid Date") res.json({ error : "Invalid Date" });
  res.json({"unix": Number(Date.parse(queryDate)), "utc": queryDate.toUTCString()});
});

app.get('/api/:timeStamp', (req, res) => {
  let timeStamp = Number(req.params.timeStamp);
  let queryDate = new Date(timeStamp);
  res.json({"unix": timeStamp, "utc": queryDate.toUTCString()});
});

// listen for requests :)
var listener = app.listen( process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
