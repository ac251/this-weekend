<template>
  <div>
    <Message
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
      @like="test"
    />
  </div>
</template>
<script>
  import Message from './Message.vue';
  import messages from './sampleData.js';
  export default {
    components: { Message },
    data() {
      return {
        messages, //update when no longer using sample data
        user: '',
      }
    },
    created() {
      return; // make api call
    },
    methods: {
      test(id) {
        console.log('ID IS', id);
      }
    }

  }

  
</script>