<template>
  <header>
    <div>
      You're not part of any rooms yet. Create a room.
    </div>
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