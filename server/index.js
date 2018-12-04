const express = require('express');
const path = require('path');
const uuidv1 = require('uuid/v1');
const cookieParser = require('cookie-parser');

const db = require('../db/index.js');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/login', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

app.use((req, res) => {
  const { uuid } = req.cookies;
  if (!uuid) {
    return res.status(401).redirect('/login');
  }
  next();
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, '..', 'public/')));

app.get('/messages', (req, res) => {
  // get last room from cookie
  // call db for messages
});

app.get('/rooms', (req, res) => {
  // get rooms user belongs to
});

app.get('/messages/:room', (req, res) => {
  const { room } = req.params;
  const { startTime } = req.query;
  if (!startTime) {
    db.getAllMessages(room)
    .then(messages => res.status(200).json(messages))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
  } else {
    db.getNewMessages(room, startTime)
    .then(messages => res.status(200).json(messages))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
  }
})
;
app.post('/users', (req, res) => {
  const { username } = req.body;
  const uuid = uuidv1();
  db.createUser(username, uuid)
    .then(() => res.cookie('uuid', uuid, {
      maxAge: 259200000, // 72 hours in ms
      // todo: set to secure once https is up and running
    }).sendStatus(201))
    .catch(() => res.sendStatus(500));
});

app.post('/messages', (req, res) => {
  db.postMessage(req.body)
    .then(() => res.sendStatus(201))
    .catch(err => console.log(err)); 
});

app.post('/invites', (req, res) => {
  // add invited user to room
});

app.post('/rooms', (req, res) => {
  // create room
});

app.listen(3000, () => console.log('listening on port 3000'));