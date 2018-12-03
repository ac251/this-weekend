const express = require(express);
const path = require('path');

const app = express();

app.use(express.json());

app.use('/', () => {}); //check session

app.use('/', express.static(path.join('..', 'public')));

app.get('/messages', (req, res) => {
  // get last room from cookie
  // call db for messages
});

app.get('/rooms', (req, res) => {
  // get rooms user belongs to
});

app.get('messages/:room', (req, res) => {
  // get all messages for room in params
})

app.get('/messages/:room/updates', (req, res) => {
  // get messages since last request
});

app.post('/users', (req, res) => {
  // create user
});

app.post('/messages', (req, res) => {
  // post message
})

app.post('/invites', (req, res) => {
  // add invited user to room
})

app.post('/rooms', (req, res) => {
  // create room
})