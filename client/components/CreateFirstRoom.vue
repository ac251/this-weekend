<template>
  <header>
    <h3>
      You're not part of any rooms yet. Create a room.
    </h3>
    <form>
      <input
        type="text"
        v-model="input"
      >
      <button @click.prevent="$emit('create-room', input)">
        create room
      </button>
    </form>
</header>
</template>

<script>
  export default {
    name: 'CreateFirstRoom',
    data() {
      return {
        input: '',
      };
    }
  };
</script>