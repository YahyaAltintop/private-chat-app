<script setup>
import ShareRoomId from "./ShareRoomId.vue";
</script>

<template>
  <div style="height: 100%">
    <ShareRoomIdDiv v-show="showRoomIdDiv" />
    <ul>
      <li
        id="shareRoomId"
        v-if="$store.isUserChatOwner"
        @click="toggleRoomIdDiv"
      >
        Participants
      </li>
      <li v-else>Participants</li>
      <li v-for="({ name, id }, i) in $store.getParticipants" :key="i">
        {{ id == $store.getUserId ? "You" : name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: { ShareRoomIdDiv: ShareRoomId },
  data() {
    return {
      showRoomIdDiv: false,
    };
  },
  methods: {
    toggleRoomIdDiv() {
      this.showRoomIdDiv = !this.showRoomIdDiv;

      if (this.showRoomIdDiv) {
        document.onmousedown = (e) => {
          if (e.target.id == "shareRoomId") {
            return;
          }

          this.showRoomIdDiv = false;
          document.onmousedown = null;
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding-left: 0;
  padding: 0;
  overflow-y: auto;
  max-height: 100%;

  li {
    padding: 8px 15px;
    margin: 3px;
    border-bottom: 1px solid #333333;
    overflow-wrap: break-word;
  }
}

ul li:first-child {
  text-align: center;
  font-weight: 600;
  user-select: none;
}

#shareRoomId::after {
  content: "+";
  font-size: 20px;
  font-weight: 500;
  position: absolute;
  right: 10px;
  top: 2px;
}

#shareRoomId:hover {
  background-color: #202222;
  cursor: pointer;
}

#shareRoomId:active {
  background-color: #232525;
}
</style>