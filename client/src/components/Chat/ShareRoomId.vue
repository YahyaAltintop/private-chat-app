<template>
  <div class="share-room-popover" @mousedown.stop>
    <div>
      <label>Room Code</label>
      <input type="text" ref="RoomIdInput" readonly v-model="$store.roomId" />
    </div>
    <span @click="copyRoomCode"><img :src="svg" width="20" /></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgLink: "copy-clipboard-icon.svg",
    };
  },
  computed: {
    svg() {
      return "src/assets/" + this.imgLink;
    },
  },
  methods: {
    copyRoomCode() {
      navigator.clipboard.writeText(this.$store.roomId).then(() => {
        this.imgLink = "copied-icon.svg";
        this.$refs.RoomIdInput.select();

        setTimeout(() => {
          this.imgLink = "copy-clipboard-icon.svg";
        }, 1500);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.share-room-popover {
  display: flex;
  align-items: flex-end;
  position: absolute;
  background: #eee;
  top: -8%;
  right: 5%;
  left: 5%;
  padding: 0 5px 5px 5px;
  border-radius: 3px;

  input {
    padding: 5px;
    border: none;
    outline: none;
  }

  label {
    color: #181818;
    user-select: none;
    font-size: 12px;
  }

  span {
    height: 23px;
    cursor: pointer;
    user-select: none;
  }
}
</style>