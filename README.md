# this-weekend
ephemeral messaging and group chat app, in Node.js, Vue.js and PostgreSQL.

Not only do the messages expire, the handles do, too.

Pick a username, no password needed, and then for 72 hours you'll have access from that browser. Create rooms and invite people to join you.

After 72 hours? It's all gone.

to start:

`createdb this_weekend`

`npm i`

set environment variables for postgres user, password and db

`npm run build`

`npm run start`
