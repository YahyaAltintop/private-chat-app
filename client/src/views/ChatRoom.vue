<script setup>
import ParticipantList from "../components/Chat/ParticipantList.vue";
import ChatHeader from "../components/Chat/ChatHeader.vue";
import BackChatBottom from "../components/Chat/BackChatBottom.vue";
</script>

<template>
  <div class="chat">
    <ChatHeader />
    <div class="chat-body">
      <div class="chat-participants">
        <ParticipantList />
      </div>
      <div class="chat-content">
        <BackChatBottom />
        <div class="chat-messages"></div>
        <div class="chat-footer">
          <input
            type="text"
            v-model="message"
            placeholder="Type your message..."
            @keydown.enter="sendMessage"
          />
          <button type="button" @click="sendMessage">
            <img src="../assets/send-icon.svg" width="30" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: { ParticipantList, ChatHeader, BackChatBottom },
  data() {
    return {
      chatOwner: this.$store.getChatOwner,
      message: null,
      chatContent: null,
      dateNow: null,
    };
  },
  mounted() {
    this.$socket.on("disconnected", (userId) => {
      let username = this.$store.chat.participants.find(
        (p) => p.id == userId
      ).name;

      this.participantInfoMsg(username, "left");

      this.$store.userLeft(userId);
    });

    this.$socket.on("newParticipant", (newUser) => {
      this.$store.chat.participants.push(newUser);
      this.participantInfoMsg(newUser.name, "joined");
    });
    this.chatContent = document.querySelector(".chat-messages");

    this.$socket.on("newMessage", ({ from, message }) => {
      this.addNewMessage(message, from);
    });

    this.participantInfoMsg("You", "joined");
  },
  methods: {
    sendMessage() {
      if (!this.message) {
        return;
      }

      this.$socket.emit("sendMessage", {
        message: this.message,
        from: this.$store.getUserName,
        roomId: this.$store.getRoomId,
      });

      this.addNewMessage(this.message, "You");
      this.message = "";
    },

    addNewMessage(msg, sender) {
      let msgHTML = `<div class="msg ${
        sender == "You" ? "right" : "left"
      }-msg">
            <div class="msg-info">
              <div class="msg-from">${sender}</div>
              <div class="msg-date">${this.getDate()}</div>
            </div>
            <div class="msg-text">${msg}</div>
          </div>`;

      this.chatContent.insertAdjacentHTML("beforeend", msgHTML);
      this.chatContent.scrollTop = this.chatContent.scrollHeight;
    },

    participantInfoMsg(username, msg) {
      let msgHTML = `<div class="participant-msg"><span><b>${username}</b> ${msg}.</span> <small>${this.getDate()}</small></div>`;

      this.chatContent.insertAdjacentHTML("beforeend", msgHTML);
      this.chatContent.scrollTop += 100;
    },
    getDate() {
      return new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style lang="scss">
$chat-border-radius: 5px;

.chat {
  margin-top: auto;
  margin-bottom: auto;
  width: 1200px;
  height: 750px;
  background: #181818;

  .chat-body {
    width: 100%;
    height: 100%;
    display: flex;

    .chat-participants {
      border-bottom-left-radius: $chat-border-radius;
      width: 20%;
      border: 1px solid #eee;
    }

    .chat-content {
      width: 80%;
      border: 1px solid #eee;
      border-bottom-right-radius: $chat-border-radius;

      .chat-messages {
        max-height: 92%;
        overflow-y: auto;

        .participant-msg {
          margin-inline: auto;
          text-align: center;
          border: 1px solid #3d3d3d;
          border-radius: 1rem;
          margin-top: 0.75rem;
          max-width: fit-content;
          padding: 5px 1rem 5px 2.5rem;

          span {
            margin-right: 10px;
          }
        }

        .left-msg {
          border: 1px solid rgb(44, 50, 87);
          margin: 1rem auto 0 1rem;
          border-radius: 1rem 1rem 1rem 0;

          .msg-from {
            margin-right: 10px;
          }
        }

        .right-msg {
          border: 1px solid rgb(54, 87, 44);
          margin: 1rem 1rem 0 auto;
          border-radius: 1rem 1rem 0 1rem;
        }

        .msg {
          max-width: max-content;
          padding: 5px 1.25rem 10px 1.25rem;

          .msg-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;

            .msg-from {
              font-weight: bold;
            }

            .msg-date {
              font-size: 12px;
            }
          }

          .msg-text {
            overflow-wrap: break-word;
            min-width: 75px;
          }
        }
      }

      .chat-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 8px;
        background: #181818;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-between;

        input {
          padding: 0 10px;
          outline: none;
          width: 92%;
          background-color: #dedfed;
          border: none;
          border-radius: 5px;
          box-sizing: border-box;
          transition: 0.15s all ease-in-out;

          &::placeholder {
            padding-left: 4px;
          }

          &:focus {
            box-shadow: inset 0 0 0 2px #7690d6;
          }
        }

        button {
          background-color: #181818;
          cursor: pointer;
          margin-inline: auto;
          padding: 0;
          border: none;
          outline: none;
          user-select: none;
        }
      }
    }
  }
}
</style>