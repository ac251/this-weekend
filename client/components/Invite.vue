<template>
  <header>
    <div class="top-text">invite people to <span class="current-room-name">{{room.name}}</span></div>
    <form>
      <input type="text" v-model="input"/>
      <button @click.prevent="submit">
        send invite
      </button>
    </form>
    <div v-if="sent"
      :class="success ? 'invite-success' : 'invite-failure'"
    >
      {{success ? `invite sent to ${lastInput}` : `we couldn\'t find anyone by the name of ${lastInput}`}}
    </div>
    <button @click="$emit('done')">
      done
    </button>
  </header>
</template>

<script>
  import requests from '../fetchRequests.js';
  export default {
    name: 'Invite',
    props: ['room'],
    data() {
      return {
        input: '',
        sent: false,
        success: false,
        lastInput: '',
      };
    },
    methods: {
      submit() {
        this.lastInput = this.input;
        this.input = '';
        requests.inviteUserToRoom(this.lastInput, this.room.id)
          .then(() => {
            this.sent = true;
            this.success = true;
          })
          .catch(() => {
            this.sent = true;
            this.success = false;
          });
        },
    }
  };
  
</script>