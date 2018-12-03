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
      <button @click.prevent="test">send</button>
    </form>
  </div>
</template>
<script>
  import Message from './Message.vue';
  import RoomsList from './RoomsList.vue';
  import messages from './sampleData.js';
  export default {
    components: { Message, RoomsList },
    data() {
      return {
        messages, //update when no longer using sample data
        user: '',
        choosingRoom: true,
        inviting: false,
        rooms: [{id: 1, name: 'test'}], //get rid of this sample stuff
        currentRoom: {id: 1, name: 'the best room'}, // this too
        messageText: '',
      }
    },
    created() {
      return; // make api call
    },
    methods: {
      test(id) {
        console.log(this.messageText);
      },
      changeRoom(roomId) {
        // call api, get messages
      },
      sendMessage() {
        // call api, send
      },
    }

  }  
</script>