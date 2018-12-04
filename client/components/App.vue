<template>
  <div>
    <main>
      <CreateFirstRoom
        v-if="!currentRoom.id"
        @create-room="createRoom"
      />
      <RoomsList
        v-else-if="choosingRoom"
        @changeRoom="changeRoom"
        :rooms = "rooms"
        :currentRoom = "currentRoom"
        @back="choosingRoom = false"
        @create-room="createRoom"
      />
      <Invite
        v-else-if="inviting"
        @back="inviting = false"
      />
      <header v-else>
        <button>
          change rooms
        </button>
        <button>
          invite people to room
        </button>
      </header>
      <Message
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
      />
    </main>
    <form>
      <textarea v-model="messageText"></textarea>
      <button @click.prevent="sendMessage">send</button>
    </form>
  </div>
</template>
<script>
  import Message from './Message.vue';
  import RoomsList from './RoomsList.vue';
  import CreateFirstRoom from './CreateFirstRoom.vue';
  import Invite from './Invite.vue';
  import requests from '../fetchRequests.js';
  export default {
    name: 'App',
    components: { Message, RoomsList, CreateFirstRoom, Invite },

    data() {
      return {
        messages: [],
        user: '',
        choosingRoom: false,
        inviting: false,
        rooms: [{id: 1, name: 'test'}], //get rid of this sample stuff
        currentRoom: {},
        messageText: '',
      };
    },

    created() {
      requests.getInitialMessages()
        .then(({messages, rooms, initialRoomIdx}) => {
          if (messages.length === 0) {
            return this.choosingRoom = true;
          }
          this.messages = messages;
          this.rooms = rooms;
          if (initialRoomIdx) {
            this.currentRoom = this.rooms[initialRoomIdx];
          }
        })
        .catch(err => console.log('ERROR', err));
    },

    mounted() {
      this.interval = setInterval(() => this.getNewMessages(), 2000);
    },

    methods: {
      changeRoom(roomId) {
        clearInterval(this.interval);
        this.rooms.forEach(room => {
          if (room.id === roomId) {
            this.currentRoom = room
          }
        });
        requests.getAllMessages(this.currentRoom.id)
          .then(messages => {
            this.messages = messages;
            this.interval = setInterval(() => this.getNewMessages(), 2000)

          })
          .catch(err => console.log('ERROR', err));    
      },

      sendMessage() {
        const message = {
          roomid: this.currentRoom.id,
          body: this.messageText,
          userid: 1,
        };
        this.messageText = '';
        requests.sendMessage(message)
          .then(() => {})
          .catch(err => console.log('ERROR', err));
      },

      getNewMessages() {
        if (!this.currentRoom.id) {
          return;
        }
        console.log('MESSAGES', this.messages);
        const lastMessageTime = this.messages.length > 0
          ? this.messages[this.messages.length - 1].posted
          : new Date(0).toISOString();
        return requests.getNewMessages(this.currentRoom.id, lastMessageTime)
          .then(newMessages => {
            let start;
            if (newMessages[0].id === this.messages[this.messages.length - 1].id) {
              start = 1;
            } else {
              start = 0;
            }
            for (let i = start; i < newMessages.length; i++) {
              this.messages.push(newMessages[i]);
            }
          })
          .catch(err => console.log('ERROR', err));
      },

      createRoom(roomName) {
        requests.createNewRoom(roomName)
          .then(({ roomid }) => {
            console.log(roomid);
            this.getRooms(() => this.changeRoom(roomid));
          })
          .catch(err => console.log('ERROR', err));
      },

      getRooms(cb = () => {}) {
        requests.getRooms()
          .then(rooms => {
            this.rooms = rooms;
            cb();
          })
          .catch(err => console.log('ERROR', err));
      }
    }

  };

</script>