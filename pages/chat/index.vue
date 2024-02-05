<template lang="pug">
v-app(id="inspire")
  v-navigation-drawer.menu(v-model="drawer" app color="grey darken-4")
    div(class="pa-4 d-flex align-center")
      v-btn.mr-auto(icon @click="drawer = false")
        v-icon fa-solid fa-bars
      v-avatar(class="mr-4" color="grey" size="34")
      div {{user.name}}
    v-divider
    v-list
      v-subheader Users in room
      v-list-item(v-for="(u, index) in users" :key="`user-${index}`" link)
        v-list-item-content
          v-list-item-title {{ u.name }}
        v-list-item-icon
          v-icon(:color="u.id === user.id ? 'primary' : 'grey'") fa-brands fa-rocketchat

  v-main
    v-app-bar(app clipped-right color="grey darken-4" flat height="67")
      v-app-bar-nav-icon(@click="drawer = !drawer")
      v-spacer
      v-responsive(max-width="156")
        v-text-field(dense flat hide-details rounded solo-inverted)
      v-btn(color="blue" icon @click="onLeave")
        <v-icon>fa-solid fa-sign-out-alt</v-icon>
    v-container.py-8.px-6.chat-wrapper(fluid ref="block")
      VMessages(v-for="(m, index) in messages" :key="index" :name="m.name" :message="m.message")
  v-footer(class="border-t" app height="67" inset)
    EmojiPicker(v-if="isEmojiOpen" @emoji_click="onSelectEmoji" :show-arrow="false")
    div(class='button-icon emoji' @click="isEmojiOpen = !isEmojiOpen")
      v-icon(v-if="!isEmojiOpen") fa-solid fa-face-smile
      v-icon(v-else) fa-solid fa-laugh-beam
    v-text-field(v-model="message" placeholder="Write a message..." flat hide-details rounded solo-inverted
    @keyup.enter="onSubmit")
    div(class='button-icon' @click='onSubmit')
      v-icon fa-solid fa-paper-plane
  </template>

<script>
import { mapState, mapMutations } from "vuex";
import VMessages from "~/components/VMessages.vue";
import EmojiPicker from "~/components/UI/EmojiPicker.vue";

export default {
  components: {
    VMessages,
    EmojiPicker,
  },
  middleware: "auth",
  data: () => ({
    drawer: null,
    isEmojiOpen: false,
    state: [],
    message: "",
  }),
  head() {
    return {
      title: `Room ${this.user.room}`,
    };
  },
  computed: {
    ...mapState(["user", "users", "messages"]),
  },
  watch: {
    messages() {
      setTimeout(() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
      }, 0);
    },
  },
  created() {
    // this.$socket.emit("joinRoom", this.user);
  },
  methods: {
    ...mapMutations(["clearData"]),
    // exit() {
    //   this.$socket.emit("userLeft", () => {
    //     this.$router.push("/?message=leftChat");
    //     this.clearData();
    //   });
    // },
    onSubmit() {
      if (!this.message) {
        return;
      }

      this.$socket.emit(
        "createMessage",
        {
          message: this.message,
          id: this.$store.state.user.id,
        },
        (data) => {
          if (typeof data === "string") {
            console.error(data);
          } else {
            this.message = "";
          }
        },
      );
    },
    onSelectEmoji(emoji) {
      this.message += emoji;
    },
    onLeave() {
      this.$socket.emit("onLeave", this.user.id, () => {
        this.$router.push("/?message=left_chat");
        this.clearData();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.menu {
  @media (max-width: 600px) {
    width: 100% !important;
  }
}
.button-icon {
  &.emoji {
    padding-right: 16px;
  }
  &:not(.emoji) {
    padding-left: 16px;
  }
  cursor: pointer;
}
.emoji {
  width: 40px;
  cursor: pointer;
  position: relative;
}
.emoji img {
  vertical-align: middle;
}

.emojies {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100%;
}

.chat-wrapper {
  overflow-y: auto;
  height: calc(100dvh - 135px);
}
</style>
