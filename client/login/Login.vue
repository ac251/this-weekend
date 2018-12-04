<template>
  <div>
    <h1>
      what do you want to be called this weekend?
    </h1>
    <form>
      <input
        type="text"
        v-model="username"
      />
      <button @click="submit">
        join the weekend
      </button>
      <div v-if="error">
        {{message}};        
      </div>
    </form>
  </div>
</template>
<script>
  import requests from '../fetchRequests.js';
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        error: false,
        message: '',
      };
    },
    methods: {
      submit() {
        requests.createNewUser(this.username)
        .then(window.location.replace('/'))
        .catch(err => {
          this.error = true;
          this.message = err.message;
        });
      }

    }

  };
  
</script>