<template>
  <div class="message"
  >
    <div class="user">
      {{ message.user }}
    </div>
    <div class="message-text">
      {{ message.body }}
    </div>
    <div class="timestamp">
      {{ timestamp }}
    </div>
  </div> 
</template>

<script>
  import timeago from 'timeago.js';
  export default {
    name: 'Message',
    props: ['message'],
    computed: {
      timestamp() {
        return timeago().format(this.message.posted);
      }
    },
  };
</script>