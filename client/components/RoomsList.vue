<template>
  <header>
    <button v-for="room in displayRooms"
      :key="room.id"
      @click="$emit('changeRoom', room.id)"
    >
      {{room.name}}
    </button>
    <button @click="$emit('back')">
      back to <span class="current-room-name">{{currentRoom.name}}</span>
    </button>
    <button @click="toggleCreate">
      {{creating ? 'cancel' : 'create new room' }}
    </button>
    <form v-if="creating">
      <input type="text" v-model="input">
      <button @click.prevent="$emit('create-room', input)">
        create room
      </button>
    </form>
  </header>
</template>
<script>
  export default {
    name: 'RoomsList',
    props: ['rooms', 'currentRoom'],
    data() {
      return {
        creating: false,
        input: '',
      };
    },
    computed: {
      displayRooms() {
        return this.rooms.filter((room) => room.id !== this.currentRoom.id);
      }
    },
    methods: {
      toggleCreate() {
        this.creating = !this.creating;
        this.input = '';
      }
    }
  };
</script>