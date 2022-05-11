<template>
  <span
    v-show="showArrowBackDown"
    class="back-down-arrow"
    @click="backChatLatest"
  >
    <img src="../../assets/down-arrow.svg" width="25" />
  </span>
</template>

<script>
export default {
  data() {
    return {
      chatContent: null,
      showArrowBackDown: false,
    };
  },
  mounted() {
    this.chatContent = document.querySelector(".chat-messages");
    this.chatContent.addEventListener("scroll", this.onScroll);
  },
  methods: {
    backChatLatest() {
      this.chatContent.scrollTop = this.chatContent.scrollHeight;
    },
    onScroll() {
      this.showArrowBackDown =
        this.chatContent.scrollHeight - this.chatContent.clientHeight !=
        this.chatContent.scrollTop;
    },
  },
};
</script>

<style scoped>
.back-down-arrow {
  display: flex;
  position: absolute;
  bottom: 10%;
  right: 5%;
  cursor: pointer;
  z-index: 1;
  background: #eee;
  border-radius: 50%;
  height: 25px;
  animation: showEffect 0.8s cubic-bezier(0.65, 0.05, 0.36, 1) both;
}

@keyframes showEffect {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>