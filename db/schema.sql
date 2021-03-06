CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  uuid UUID NOT NULL,
  joined TIMESTAMPTZ DEFAULT current_timestamp
);

CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  created TIMESTAMPTZ DEFAULT current_timestamp
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  userid INTEGER NOT NULL REFERENCES users(id),
  roomid INTEGER NOT NULL REFERENCES rooms(id),
  body TEXT NOT NULL,
  posted TIMESTAMPTZ DEFAULT current_timestamp
);

CREATE TABLE users_rooms (
  userid INTEGER NOT NULL REFERENCES users(id),
  roomid INTEGER NOT NULL REFERENCES rooms(id),
  joined TIMESTAMPTZ DEFAULT current_timestamp
);

CREATE INDEX uuid_idx ON users(uuid);
CREATE INDEX username_idx ON users(name);
CREATE INDEX roomname_idx ON rooms(name);
CREATE INDEX user_rooms_idx ON users_rooms(userid); 