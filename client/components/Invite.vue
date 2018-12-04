<template>
  <header>
    <h1>invite people to {{room}}</h1>
    <form>
      <input type="text" v-model="input"/>
      <button>
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
  export default {
    name: 'Invite',
    props: ['room'],
    data() {
      return {
        input: '',
        sent: false,
      }
    },
    submit() {
      // submit user
    }
  }
  
</script>