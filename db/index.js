const { Pool } = require('pg');

const pool = new Pool();

module.exports.checkRoomAuth = (uuid, roomId) => {
  const queryStr = 'SELECT users_rooms.joined, users.id FROM users INNER JOIN users_rooms ON users.id = users_rooms.userid WHERE users.uuid = $1 AND users_rooms.room = $2';
  
  return pool.query(queryStr, [uuid, roomId])
    .then(({ rows }) => {
      if (rows.length === 0) {
        throw new Error('unauthorized');
      }
      return;
    })
};

module.exports.getAllMessages = (roomId) => {
  const queryStr = 'messages.body, messages.room, messages.posted, users.name AS user FROM messages INNER JOIN users ON messages.user = users.id WHERE messages.room = $1';
  
  return pool.query(queryStr, [roomId])
    .then(({ rows }) => rows);
};

module.exports.getNewMessages = (roomId, start) => {
  const queryStr = 'SELECT messages.body, messages.room, messages.posted, users.name AS user FROM messages INNER JOIN users ON messages.userid = users.id WHERE messages.room = $1 AND messages.posted > $2';
  
  return pool.query(queryStr, [roomId, start])
    .then(({ rows }) => rows);
};

module.exports.getRooms = (uuid) => {
  const queryStr = 'SELECT rooms.* FROM users INNER JOIN users_rooms ON users.id = users_rooms.userid INNER JOIN rooms ON users_rooms.room = rooms.id';
  
  return pool.query(queryStr, [uuid])
    .then(({ rows }) => rows);
};

module.exports.createRoom = (uuid, roomName) => {
  const findUser = 'SELECT id as user FROM users WHERE uuid = $1';
  const createRoom = 'INSERT INTO rooms (name) VALUES ($1) RETURNING id as room';
  const linkUserToRoom = 'INSERT INTO users_rooms (user, room) VALUES ($1, $2)';
  
  return pool.query(findUser, [uuid])
    .then(({ rows }) => {
      const { id } = rows[0];
      return pool.query(createRoom, [roomName])
        .then(({ rows }) => {
          const { room } = rows[0];
          return room;
        })
        .then(room => pool.query(linkUserToRoom, [id, room]));
    });
}

module.exports.createUser = (userName, uuid) => {
  const queryStr = 'INSERT INTO users (name, uuid) VALUES ($1, $2)';
  
  return pool.query(queryStr, [userName, uuid]); 
}

module.exports.findUser = (userName) => {
  const queryStr = 'SELECT * FROM users WHERE name = $1';

  return pool.query(queryStr, [userName])
    .then(({ rows }) => rows);
}

module.exports.postMessage = (message) => {
  const { user, room, body } = message;
  const queryStr = 'INSERT INTO messages (user, room, body) VALUES ($1, $2, $3)';
  return pool.query(queryStr, [user, room, body])
}
