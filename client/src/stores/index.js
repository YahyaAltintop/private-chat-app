import { defineStore } from 'pinia'

const store = defineStore({
  id: 'user',
  state: () => ({
    id: null,
    isUserChatOwner: false,
    inputMaxLength: 50,
    userName: null,
    roomId: null,
    chat: {
      owner: null,
      participants: []
    }
  }),
  getters: {
    getUserName: (state) => state.userName,
    getUserId: (state) => state.id,
    getParticipants: (state) => state.chat.participants,
    getChatOwner: (state) => state.chat.owner,
    getRoomId: (state) => state.roomId,
    maxLength: (state) => state.inputMaxLength,
  },
  actions: {
    createRoom(chatOwner, roomId, userId) {
      this.chat.owner = chatOwner;
      this.chat.participants.push({ id: userId, name: chatOwner });
      this.userName = chatOwner;
      this.roomId = roomId;
      this.id = userId;
      this.isUserChatOwner = true;
    },
    joinRoom({ chatOwner, participants, roomId }) {
      this.chat.owner = chatOwner;
      this.chat.participants = [...participants];
      this.roomId = roomId;
    },
    userLeft(userId) {
      this.chat.participants = this.chat.participants.filter(p => p.id != userId);
    },
    setUser(userName, userId) {
      this.userName = userName;
      this.id = userId;
    },
    setChatOwner(chatOwner) {
      this.chat.owner = chatOwner;
    }
  }
})

export { store };