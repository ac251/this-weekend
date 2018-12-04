const { Pool } = require('pg');

const pool = new Pool();

module.exports.checkRoomAuth = (uuid, roomId) => {
  const queryStr = 'SELECT users_rooms.joined, users.id FROM users INNER JOIN users_rooms ON users.id = users_rooms.userid WHERE users.uuid = $1 AND users_rooms.roomid = $2';
  
  return pool.query(queryStr, [uuid, roomId])
    .then(({ rows }) => {
      if (rows.length === 0) {
        throw new Error('unauthorized');
      }
      return;
    });
};

module.exports.getAllMessages = (roomId) => {
  const queryStr = 'SELECT messages.*, users.name AS user FROM messages INNER JOIN users ON messages.userid = users.id WHERE messages.roomid = $1 ORDER BY posted ASC';
  
  return pool.query(queryStr, [roomId])
    .then(({ rows }) => rows);
};

module.exports.getNewMessages = (roomId, start) => {
  const queryStr = 'SELECT messages.*, users.name AS user FROM messages INNER JOIN users ON messages.userid = users.id WHERE messages.roomid = $1 AND messages.posted > $2 ORDER BY posted ASC';
  
  return pool.query(queryStr, [roomId, start])
    .then(({ rows }) => rows);
};

module.exports.getRooms = (uuid) => {
  const queryStr = 'SELECT rooms.id, rooms.name FROM users INNER JOIN users_rooms ON users.id = users_rooms.userid INNER JOIN rooms ON users_rooms.roomid = rooms.id WHERE users.uuid = $1';
  
  return pool.query(queryStr, [uuid])
    .then(({ rows }) => rows);
};

module.exports.createRoom = (uuid, roomName) => {
  const findUser = 'SELECT id FROM users WHERE uuid = $1';
  const createRoom = 'INSERT INTO rooms (name) VALUES ($1) RETURNING id as roomid';
  const linkUserToRoom = 'INSERT INTO users_rooms (userid, roomid) VALUES ($1, $2)';
  
  return pool.query(findUser, [uuid])
    .then(({ rows }) => {
      if (rows.length === 0) {
        throw new Error('user not found');
      }
      const { id } = rows[0];
      return pool.query(createRoom, [roomName])
        .then(({ rows }) => {
          const { roomid } = rows[0];
          return pool.query(linkUserToRoom, [id, roomid])
            .then(() => roomid);
        });
    });
};

module.exports.createUser = (userName, uuid) => {
  const queryStr = 'INSERT INTO users (name, uuid) VALUES ($1, $2)';
  
  return pool.query(queryStr, [userName, uuid]); 
};

module.exports.addUserToRoom = (userid, roomid) => {
  const queryStr = 'INSERT INTO users_rooms (userid, roomid) VALUES ($1, $2)';
  return pool.query(queryStr, [userid, roomid]);
};

module.exports.findUser = (userName) => {
  const queryStr = 'SELECT * FROM users WHERE name = $1';

  return pool.query(queryStr, [userName])
    .then(({ rows }) => rows);
};

module.exports.postMessage = (message) => {
  const { userid, roomid, body } = message;
  const queryStr = 'INSERT INTO messages (userid, roomid, body) VALUES ($1, $2, $3)';
  return pool.query(queryStr, [userid, roomid, body]);
};
