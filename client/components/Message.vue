<template>
  <div class="message"
    :class="{ liked }"
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
    data() {
      return {
        liked: false,
      };
    },
    computed: {
      timestamp() {
        return timeago().format(this.message.posted);
      }
    },
    methods: {
      like() {
        this.liked = true;
        this.$emit('like', this.message.id);
      },
    },
  };
</script>