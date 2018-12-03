<template>
  <div>
    <main>
      <RoomsList
        v-if="choosingRoom"
        @changeRoom="changeRoom"
        :rooms = "rooms"
        :currentRoom = "currentRoom"
        @back="choosingRoom = false"
      />
      <Invite
        v-else-if="inviting"
        @back="inviting = false"
      />
      <header v-else>
        
      </header>
      <Message
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
        @like="test"
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
  import messages from './sampleData.js';
  import requests from '../fetchRequests.js';
  export default {
    components: { Message, RoomsList },
    data() {
      return {
        messages: [], //update when no longer using sample data
        user: '',
        choosingRoom: true,
        inviting: false,
        rooms: [{id: 1, name: 'test'}], //get rid of this sample stuff
        currentRoom: {id: 1, name: 'the best room'}, // this too
        messageText: '',
      }
    },
    created() {
      const { currentRoom, messages } = this;
      requests.getAllMessages(currentRoom.id)
        .then(newMessages => messages.push(...newMessages))
        .catch(err => console.log(err));
    },
    methods: {
      test() {
        console.log(this.messageText);
      },
      changeRoom(roomId) {
        
      },
      sendMessage() {
        const message = {
          room: this.currentRoom.id,
          body: this.messageText,
          user: 1,
        }
        requests.sendMessage(message)
          .then(() => {})
          .catch(err => console.log(err));
      },
    }

  }  
</script>