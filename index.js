const express = require('express');
const shortid = require('shortid');

const app = express();

// PORT
const PORT = process.env.PORT || 3000;

const generateRandomURL = () => {
  let url = shortid.generate().slice(4) + shortid.generate().slice(0, 5);
  console.log(url);
  return url;
}

let randomURL = "";
let originURL = "";
let randomVal = "";

app.post("/", (req, res) => {
  const connection = req.accepts(null, req.origin);
  console.log(connection)
  
  originURL = req.query.url;
  randomVal = '/' + generateRandomURL();
  randomURL = `http://localhost:${PORT}` + randomVal;
  res.json({ shortenedURL: randomURL });
});

app.get('/*', (req, res) => {
  console.log("here");
  if (req.originalUrl == randomVal) {
    res.json({ url: originURL });
  }
})

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
  
