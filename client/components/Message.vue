<template>
  <div
    class="message"
    :class="userClass"
  >
    <div class="user">
      {{ message.user }}
    </div>
    <div class="message-body">
      <div class="message-text">
        {{ message.body }}
      </div>
      <div class="timestamp">
        {{ timestamp }}
      </div>
    </div>
  </div> 
</template>

<script>
  import timeago from 'timeago.js';
  export default {
    name: 'Message',
    props: ['message', 'user'],
    computed: {
      timestamp() {
        return timeago().format(this.message.posted);
      },
      userClass() {
        return this.message.userid === this.user.id ? 'same-user' : 'other-user';
      }
    },
  };
</script>