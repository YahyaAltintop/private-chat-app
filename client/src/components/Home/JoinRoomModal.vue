<template>
  <div class="modal" :class="{ 'show-modal': this.open }" id="joinRoomModal">
    <div class="modal-content">
      <input
        type="text"
        v-model="username"
        :maxlength="$store.maxLength"
        placeholder="Enter your nick name"
        @keydown.enter="joinRoom"
      />
      <input
        type="text"
        v-model="roomId"
        placeholder="Room Code"
        @keydown.enter="joinRoom"
      />
    <div class="modal-footer">
      <button class="btn-modal-footer btn-cancel" @click="onCloseClick">Cancel</button>
      <button class="btn-modal-footer btn-join" :disabled="isValidForJoin" @click="joinRoom">Join</button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["open"],
  data() {
    return {
      roomId: null,
      username: null,
    };
  },
  computed: {
    isValidForJoin() {
      return !this.roomId?.trim() || !this.username?.trim();
    },
  },
  mounted() {
    this.$socket.on("roomNotFound", () => {
      console.log("ROOM NOT FOUND!");
    });
    this.$socket.on("joinedRoom", ({ room, id }) => {
      this.$store.joinRoom(room);
      this.$store.setUser(this.username, id);

      this.$router.push({ name: "chat" });
    });
  },
  methods: {
    joinRoom() {
      if (!this.roomId?.trim() || !this.username.trim()) {
        return;
      }

      this.$socket.emit("joinRoom", {
        roomId: this.roomId,
        username: this.username,
      });
    },
    onCloseClick() {
      this.roomId = "";
      this.username = "";
      this.$emit("closeModal");
    },
  },
};
</script>
