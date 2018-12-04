<template>
  <div>
    <CreateFirstRoom
      v-if="!currentRoomSelected"
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
      :room="currentRoom"
      @done="inviting = false"
    />
    <header v-else>
      <div class="top-text">
        in room {{currentRoom.name}}
      </div>
      <div class="button-row">
        <button @click="choosingRoom = true">
          change rooms
        </button>
        <button @click="inviting = true">
          invite people to room
        </button>
      </div>
    </header>
    <main>
      <div class="spacer-top"></div>
      <Message
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :user="user"
      />
      <div class="spacer-bottom"></div>
    </main>
    <footer v-if="currentRoomSelected">
      <form class="message-compose">
        <textarea
          v-model="messageText"
          @keyup.enter="sendMessage"
        >
        </textarea>
        <button @click.prevent="sendMessage">send</button>
      </form>
    </footer>
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
        user: {},
        choosingRoom: false,
        inviting: false,
        rooms: [], //get rid of this sample stuff
        currentRoom: {},
        currentRoomSelected: false,
        messageText: '',
      };
    },

    created() {
      this.interval = setInterval(() => this.getRooms(() => {
          if (this.rooms.length > 0) {
            this.changeRoom(this.rooms[0].id);
            this.initializeMessages();
          }
        }), 2000);
      this.initializeMessages();
    },

    mounted() {
        
    },
      

    methods: {
      changeRoom(roomId) {
        clearInterval(this.interval);
        this.choosingRoom = false;
        this.rooms.forEach(room => {
          if (room.id === roomId) {
            this.currentRoom = room;
          }
        });
        requests.getAllMessages(this.currentRoom.id)
          .then(messages => {
            this.messages = messages;
            this.interval = setInterval(() => this.getNewMessages(), 2000);
            this.currentRoomSelected = true;
          })
          .catch(err => console.log('ERROR', err));    
      },

      initializeMessages() {
        requests.getInitialMessages()
        .then(({messages, rooms, initialRoomIdx, user}) => {
          this.messages = messages;
          this.rooms = rooms;
          this.user = user;
          if (initialRoomIdx !== undefined) {
            this.currentRoom = this.rooms[initialRoomIdx];
            this.currentRoomSelected = true;
            clearInterval(this.interval);
            this.interval = setInterval(() => this.getNewMessages(), 2000);
          }
        })
        .catch(err => console.log('ERROR', err));
      },

      sendMessage() {
        const lastMessageTime = this.messages.length > 0
          ? this.messages[this.messages.length - 1].posted
          : new Date(0).toISOString();
        const message = {
          roomid: this.currentRoom.id,
          body: this.messageText,
          userid: this.user.id,
        };
        this.messageText = '';
        requests.sendMessage(message, lastMessageTime)
          .then((messages) => this.updateMessages(messages))
          .catch(err => console.log('ERROR', err));
      },

      getNewMessages() {
        if (!this.currentRoom.id) {
          return;
        }
        const lastMessageTime = this.messages.length > 0
          ? this.messages[this.messages.length - 1].posted
          : new Date(0).toISOString();
        return requests.getNewMessages(this.currentRoom.id, lastMessageTime)
          .then(newMessages => {
            this.updateMessages(newMessages);
          })
          .catch(err => console.log('ERROR', err));
      },

      updateMessages(newMessages) {
        let start;
        if (this.messages.length && newMessages[0].id === this.messages[this.messages.length - 1].id) {
          start = 1;
        } else {
          start = 0;
        }
        for (let i = start; i < newMessages.length; i++) {
          this.messages.push(newMessages[i]);
        }
      },

      createRoom(roomName) {
        if (roomName.length === 0) {
          return;
        }
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
      },

    },
  };

</script>