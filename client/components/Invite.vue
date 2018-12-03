<template>
  <header>
    <h1>invite people to {{room}}</h1>
    <form>
      <input type="text" />
      <button>
        send invite
      </button>
    </form>
    <div v-if="sent"
      :class="success ? 'invite-success' : 'invite-failure'"
    >
      {{success ? 'invite sent' : 'we couldn\'t find anyone by that name'}}
    </div>
  </header>
</template>
<script>
  module.exports = {
    props: ['room'],
    data() {
      return {
        sent: false,
      }
    },
    submit() {
      // submit user
    }
  }
  
</script>