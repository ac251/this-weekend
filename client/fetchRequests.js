import queryString from 'query-string';

const handle500 = () => { throw new Error('sorry, something went wrong'); };

export default {
  createUser(name) {
    return fetch('/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name }),
    })
      .then(res => {
        if (res.status === 409) {
          throw new Error('this username is already taken');
        }
        if (res.status === 500) {
          handle500();
        }
        return res.json();
      });
  },

  sendMessage(message, lastMessageTime) {
    return fetch('/messages', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ message, lastMessageTime }),
    })
      .then(res => {
        if (res.status === 500) {
          throw new Error('something went wrong');
        }
        return res.json();
      });
  },

  getAllMessages(room) {
    return fetch(`/messages/${room}`)
      .then(res => {
        if (res.status === 500) {
          handle500();
        }
        return res.json();
      });
  },

  getInitialMessages() {
    return fetch('/messages')
      .then(res => {
        if (res.status === 500) {
          handle500();
        }
        return res.json();
      });
  },

  getNewMessages(room, startTime = (new Date(0)).toISOString()) {
    return fetch(`/messages/${room}?${queryString.stringify({ startTime })}`)
      .then(res => {
        if (res.status === 500) {
          handle500();
        }
        return res.json();
      });
  },

  createNewUser(username) {
    return fetch('/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username }),
    })
      .then(res => {
        if (res.status === 409) {
          throw new Error('sorry, that username isn\'t available');
        }
        if (res.status === 500) {
          handle500();
        }
        return;
      });
  },

  createNewRoom(roomName) {
    return fetch('/rooms', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ roomName }),
    })
      .then(res => {
        if (res.status === 500) {
          handle500();
        }
        return res.json();
      });
  },

  inviteUserToRoom(username, roomid) {
    return fetch('/invites', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, roomid }),
    })
      .then(res => {
        if (res.status === 404) {
          throw new Error('no user');
        }
        if (res.status === 500) {
          handle500();
        }
        return;
      });
  },

  getRooms() {
    return fetch('/rooms')
      .then(res => {
        if (res.status === 500) {
          handle500();
        }
        return res.json();
      });
  }

};
