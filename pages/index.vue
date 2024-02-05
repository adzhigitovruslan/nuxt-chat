<script>
import { mapMutations } from "vuex";
export default {
  name: "YourComponent",
  data() {
    return {
      name: "",
      room: "",
      message: "",
      isValid: true,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 16) || "Name must be less than 16 characters",
      ],
      roomRules: [
        v => !!v || "Enter the room",
        v => (v && v.length <= 16) || "Room must be less than 16 characters",
      ],
      snackbar: true,
    };
  },
  head: {
    title: "Nuxt chat",
  },
  sockets: {
    connect() {
      console.log("connected client");
    },
  },

  computed: {},
  mounted() {
    // const { message } = this.$route.query;
    // if (message === "noUser") {
    //   this.message = "Enter your name and room";
    // } else if (message === "leftChat") {
    //   this.message = "You leaved chat";
    // }
    // this.snackbar = !!this.message;
  },
  methods: {
    ...mapMutations(["setUser"]),
    handleClick() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room,
          id: 0,
        };

        this.$socket.emit("userJoined", user, (data) => {
          if (typeof data === "string") {
            console.error(data);
          } else {
            user.id = data.userId;
            this.setUser(user);
            this.$router.push("/chat");
          }
        });
      }

      // this.$socket.emit("createUser", user, (id) => {
      //   user.id = id;
      //   this.setUser(user);
      //   this.$router.push("/chat");
      // });
    },
  },
};
</script>

<template lang="pug">
div.form__wrapper
  v-form.form(@submit.prevent="handleClick" lazy-validation ref="form")
    h1.form__title Join
    v-card.mx-auto(max-width="400")
      //- v-snackbar(v-model="snackbar" :timeout="3000" top) {{ message }}
      //-   v-btn(dark text @click="snackbar = false") Close
      v-card-text
        v-row
          v-col
            v-text-field(label="Name"
                prepend-icon="fa-solid fa-user-astronaut"
                variant="solo-filled"
                v-model="name"
                :counter="16"
                :rules="nameRules")
        v-row
          v-col
            v-text-field(
                label="Room"
                color="primary"
                prepend-icon="fa-solid fa-door-open"
                variant="solo-filled"
                v-model="room"
                :counter="16"
                :rules="roomRules")
      v-card-actions.d-flex.flex-column
        v-btn(type="submit" color="primary" :disabled="!isValid") Enter the room
</template>

<style scoped lang="scss">
.form {
  max-width: 400px;
  width: 100%;
  &__wrapper {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100svh;
  }
  &__title {
    font-size: 40px;
    color: rgb(var(--v-theme-primary)) !important;
    line-height: 2;
    text-align: center;
  }
}
</style>
