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
      back to {{currentRoom}}
    </button>
  </header>
</template>
<script>
  export default {
    name: 'RoomsList',
    props: ['rooms', 'currentRoom'],
    computed: {
      displayRooms() {
        return this.rooms.filter((room) => room !== this.currentRoom);
      }
    }
  };
</script>