<template>
  <div class="modal" :class="{ 'show-modal': this.open }" id="createRoomModal">
    <div class="modal-content">
      <input
        type="text"
        v-model="username"
        :maxlength="$store.maxLength"
        placeholder="Enter your nick name"
      />
    <div class="modal-footer">
      <button class="btn-modal-footer btn-cancel" @click="onCloseClick">Cancel</button>
      <button class="btn-modal-footer btn-join" @click="createRoom" :disabled="!username?.trim()">Create</button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["open"],
  data() {
    return {
      username: null,
    };
  },
  methods: {
    createRoom() {
      this.$socket.emit("createRoom", this.username);

      this.$socket.on("roomCreated", ({ roomId, userId }) => {
        this.$store.createRoom(this.username, roomId, userId);
        this.$router.push({ name: "chat" });
      });
    },
    onCloseClick() {
      this.username = "";
      this.$emit("closeModal");
    },
  },
};
</script>