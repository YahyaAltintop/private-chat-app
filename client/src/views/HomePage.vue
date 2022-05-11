<script setup>
import JoinRoomModal from "@/components/Home/JoinRoomModal.vue";
import CreateRoomModal from "@/components/Home/CreateRoomModal.vue";
</script>

<template>
  <main>
    <button class="btn" @click="toggleJoinRoomModal">Join a room</button>
    <button class="btn" @click="toggleCreateRoomModal">Create room</button>
    <JoinRoomModal
      :open="showJoinRoomModal"
      @closeModal="toggleJoinRoomModal"
    />
    <CreateRoomModal
      :open="showCreateRoomModal"
      @closeModal="toggleCreateRoomModal"
    />
  </main>
</template>

<script>
export default {
  components: { CreateRoomModal, JoinRoomModal },
  data() {
    return {
      showJoinRoomModal: false,
      showCreateRoomModal: false,
    };
  },
  methods: {
    toggleJoinRoomModal() {
      this.showJoinRoomModal = !this.showJoinRoomModal;
    },
    toggleCreateRoomModal() {
      this.showCreateRoomModal = !this.showCreateRoomModal;
    },
  },
};
</script>

<style lang="scss">
.btn-modal-footer {
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  outline: none;
  padding-block: 10px;
  transition: 0.1s;
  user-select: none;
  width: 45%;
}

.btn-cancel {
  border: none;
  color: #222222;
  background-color: #ffffff;

  &:hover {
    text-decoration: underline;
  }
  &:active {
    transform: scale(0.96);
  }
}

.btn-join {
  background-color: #222222;
  color: white;

  &:active {
    transform: scale(0.96);
  }
  &:disabled {
    background-color: #363636;
    cursor: not-allowed;
  }
}

.btn {
  margin: 1rem;
  background: #eee;
  border-radius: 0.375rem;
  border: 0.125rem solid;
  color: #181818;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 700;
  padding: 0.875rem 1.125rem;
  transform: translateZ(0) scale(1);
  transition: 0.2s;
  user-select: none;

  &:hover {
    transform: scale(1.2);
  }
  &:active {
    transform: scale(0.9);
  }
}

.modal {
  input {
    background-color: #fafbfc;
    border: none;
    border-radius: 4px;
    box-shadow: inset 0 0 0 2px #dfe1e6;
    line-height: 20px;
    margin-bottom: 12px;
    outline: none;
    padding: 10px 16px;
    transition-duration: 80ms;
    transition-property: background-color, border-color, box-shadow;
    transition-timing-function: ease;
    width: 100%;

    &:hover {
      background-color: #f0f0f0;
    }
    &:focus {
      background-color: #fff;
      box-shadow: inset 0px 0px 1px 2px #222222;
    }
  }
}
</style>