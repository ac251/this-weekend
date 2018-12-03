const express = require('express');
const path = require('path');
const uuid = require('uuid/v1');
const cookieParser = require('cookie-parser');

const db = require('../db/index.js');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', (req, res, next) => {next()}); //check session

app.use('/', express.static(path.join(__dirname, '..', 'public/')));

app.get('/messages', (req, res) => {
  // get last room from cookie
  // call db for messages
});

app.get('/rooms', (req, res) => {
  // get rooms user belongs to
});

app.get('/messages/:room', (req, res) => {
  const { room } = req.params;
  db.getAllMessages(room)
    .then(messages => {console.log(messages); res.status(200).json(messages);})
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
})

app.get('/messages/:room/updates', (req, res) => {
  // get messages since last request
});

app.post('/users', (req, res) => {
  // create user
});

app.post('/messages', (req, res) => {
  db.postMessage(req.body)
    .then(() => res.sendStatus(201))
    .catch(err => console.log(err)); 
})

app.post('/invites', (req, res) => {
  // add invited user to room
})

app.post('/rooms', (req, res) => {
  // create room
})

app.listen(3000, () => console.log('listening on port 3000'));