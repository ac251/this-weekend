<template>
  <div class="message">
    <div class="user">
      {{ message.user }}
    </div>
    <div class="message-text">
      {{ message.body }}
    </div>
    <div class="timestamp">
      {{ message.timestamp }}
    </div>
    <button @click="like">like</button>
  </div> 
</template>

<script>
  export default {
    name: 'Message',
    props: ['message'],
    data() {
      return {
        liked: false,
      };
    },
    methods: {
      like() {
        this.liked = true;
        this.$emit('like', this.message.id);
      },
    },
  }
</script>