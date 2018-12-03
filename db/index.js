const { Pool } = require('pg');

const pool = new Pool();

module.exports.checkRoomAuth = (uuid, roomId) => {
  const queryStr = 'SELECT users_rooms.joined FROM users INNER JOIN users_rooms ON users.id = users_rooms.user WHERE users.uuid = $1';
  return pool.query(queryStr, [uuid])
    .then(({ rows }) => {
      if (rows.length === 0) {
        throw new Error('unauthorized');
      }
      return;
    })
};

module.exports.getAllMessages = (roomId) => {
  const queryStr = 'SELECT messages.*, users_name FROM messages INNER JOIN rooms ON messages.user = users.id WHERE messages.room = $1';
  return pool.query(queryStr, [roomId])
    .then(({ rows }) => rows);
};

module.exports.getNewMessages = (roomId, start) => {
  const queryStr = 'SELECT messages.*, users_name FROM messages INNER JOIN rooms ON messages.user = users.id WHERE messages.room = $1 AND messages.posted > $2';
  return pool.query(queryStr, [roomId, start])
    .then(({ rows }) => rows);
};

module.exports.getRooms = (uuid) => {
  const queryStr = 'SELECT rooms.* FROM users INNER JOIN users_rooms ON users.id = users_rooms.user INNER JOIN rooms ON users_rooms.room = rooms.id';
  return pool.query(queryStr, [uuid])
    .then(({ rows }) => rows);
};