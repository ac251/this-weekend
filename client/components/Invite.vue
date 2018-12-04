<template>
  <header>
    <h1>invite people to {{room}}</h1>
    <form>
      <input type="text" v-model="input"/>
      <button @click="submit">
        send invite
      </button>
    </form>
    <div v-if="sent"
      :class="success ? 'invite-success' : 'invite-failure'"
    >
      {{success ? 'invite sent' : 'we couldn\'t find anyone by that name'}}
    </div>
    <button @click="$emit(done)">
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
        success: false
      };
    },
    submit() {
      requests.inviteUserToRoom(this.input, this.room.id)
        .then(() => {
          this.sent = true;
          this.success = true;
        })
        .catch(() => {
          this.sent = true;
          this.success = false;
        });
    }
  };
  
</script>