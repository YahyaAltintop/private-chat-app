<template>
  <div class="chat-header">
    <b>{{ $store.getChatOwner }}</b
    >'s Chat
  </div>
</template>

<style scoped>
.chat-header {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  width: 100%;
  height: 5%;
  border: 1px solid #eee;
  border-bottom: 0;
  font-size: 18px;
}
</style>