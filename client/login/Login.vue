<template>
  <div>
    <h3>
      pick a name
    </h3>
    <form>
      <input
        type="text"
        v-model="username"
      />
      <button @click.prevent="submit">
        join
      </button>
      <div v-if="error" class="pickusermessage">
        {{message}}        
      </div>
    </form>
    <div class="intro">
      don't be too picky. your name only lasts 72 hours
    </div>
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
          .then(() =>  window.location.replace('/'))
          .catch(err => {
            this.error = true;
            this.message = err.message;
          });
      }

    }

  };
  
</script>