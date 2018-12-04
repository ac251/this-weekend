const express = require('express');
const path = require('path');
const uuidv1 = require('uuid/v1');
const cookieParser = require('cookie-parser');

const db = require('../db/index.js');

const app = express();

app.use(express.json());
app.use(cookieParser());


const permittedPaths = new Set(['/login', '/users']);

app.use(express.static(path.join(__dirname, '..', 'public/')));

app.use((req, res, next) => {
  if (permittedPaths.has(req.path)) {
    return next();
  }
  const { uuid } = req.cookies;
  if (!uuid) {
    console.log('blocked', req.path);
    return res.status(401).redirect('/login');
  }
  next();
});

app.get('/login', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '..', 'html', 'login.html'));
});

app.post('/users', (req, res) => {
  const { username } = req.body;
  console.log('username', username);
  const uuid = uuidv1();
  db.findUser(username)
    .then(data => {
      if (data.length > 0) {
        throw new Error('username taken');
      }
      return db.createUser(username, uuid);
    })
    .then(() => res.cookie('uuid', uuid, {
      maxAge: 259200000, // 72 hours in ms
      // todo: set to secure once https is up and running
    }).sendStatus(201))
    .catch((err) => {
      if (err.message === 'username taken') {
        return res.sendStatus(409);
      }
      console.log(err);
      res.sendStatus(500);
    });
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '..', 'html', 'index.html'));
});

app.get('/messages', (req, res) => {
  const { uuid, lastroom } = req.cookies;
  db.getRooms(uuid)
    .then(rooms => {
      let initialRoomIdx;

      if (rooms.length === 0) {
        return res.status(200).json({
          messages: [],
          rooms,
          initialRoomIdx,
        });
      }

      if (lastroom === undefined && rooms.length !== 0) {
        initialRoomIdx = 0;
      }

      rooms.forEach((room, idx) => {
        console.log('roomidtype', typeof room.id);
        if (room.id === parseInt(lastroom)) {
          console.log('FOUND IT');
          initialRoomIdx = idx;
        }
      });
      console.log('initialRoomIdx', initialRoomIdx);
      return db.getAllMessages(lastroom || rooms[0].id)
        .then(messages => {
          const body = {
            messages,
            rooms,
            initialRoomIdx,
          };
          console.log('BODY', body)
          res.status(200).json(body);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.get('/rooms', (req, res) => {
  const { uuid } = req.cookies;
  db.getRooms(uuid)
    .then(rooms => res.status(200).send(rooms))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.get('/messages/:room', (req, res) => {
  const { room } = req.params;
  const { startTime } = req.query;
  if (!startTime) {
    db.getAllMessages(room)
      .then(messages => {console.log('messagesnostarttime', messages); res.cookie('lastroom', room).status(200).json(messages)})
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  } else {
    db.getNewMessages(room, startTime)
    .then(messages => {console.log('messages', messages); res.cookie('lastroom', room).status(200).json(messages)})
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
  }
});

app.post('/messages', (req, res) => {
  db.postMessage(req.body)
    .then(() => res.sendStatus(201))
    .catch(err => console.log(err)); 
});

app.post('/invites', (req, res) => {
  const { username, roomid } = req.body;
  db.findUser(username)
    .then(rows => {
      if (rows.length === 0) {
        throw new Error('no user');
      }
      const { id } = rows[0];
      return db.addUserToRoom(id, roomid);
    })
    .then(() => res.sendStatus(201))
    .catch(err => {
      const status = err.message === 'no user' ? 404 : 500;
      res.status(status).send(err);
    });
});

app.post('/rooms', (req, res) => {
  const { roomName } = req.body;
  const { uuid } = req.cookies;
  db.createRoom(uuid, roomName)
    .then(roomid => {
      res.status(201).json({ roomid });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.listen(3000, () => console.log('listening on port 3000'));