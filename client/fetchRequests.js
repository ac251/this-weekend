import queryString from 'query-string';

handle500 = () => throw new Error('sorry, something went wrong')

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

  sendMessage(message) {
    return fetch('/messages', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(message),
    })
      .then(res => {
        if (res.status !== 201) {
          throw new Error(res.body);
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

  getNewMessages(room, startTime) {
    return fetch(`/messages/${room}?${queryString.stringify({ startTime })}`);
  },

  createNewUser(username) {
    console.log('fetching');
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
      })
  }

};
