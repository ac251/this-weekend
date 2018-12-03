module.exports = {
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
        if (res.status !== 201) {
          throw new Error('sorry, something went wrong');
        }
        return res.json();
      })
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
      })
  },

  getAllMessages(room) {
    return fetch(`/messages/${room}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('sorry, something went wrong');
        }
        return res.json();
      });
  },

}