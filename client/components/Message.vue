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
  import Moment from 'moment';
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
        return Moment(this.message.posted).fromNow();
      }
    },
    methods: {
      like() {
        this.liked = true;
        this.$emit('like', this.message.id);
      },
    },
  }
</script>