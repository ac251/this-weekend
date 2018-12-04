<template>
  <header>
    <button v-for="room in displayRooms"
      :key="room.id"
      @click="$emit('changeRoom', room.id)"
    >
      {{room.name}}
    </button>
    <button @click="$emit('invite')">
      invite people
    </button>
    <button @click="$emit('back')">
      back to {{currentRoom.name}}
    </button>
    <button @click="toggleCreate">
      {{creating ? 'create new room' : 'cancel' }}
    </button>
    <form v-if="creating">
      <input type="text" v-model="input">
      <button @click="$emit('create-room', input)">
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
        return this.rooms.filter((room) => room !== this.currentRoom);
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