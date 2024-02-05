import Vue from "vue";
import VueSocketIO from "vue-socket.io";
// import io from "socket.io-client";

// const socketInstance = io("/", {
//   rejectUnauthorized: false,
//   reconnection: true,
//   reconnectionDelay: 1000,
//   reconnectionDelayMax: 5000,
//   reconnectionAttempts: 15,
// });

export default ({ store }) => {
  Vue.use(
    new VueSocketIO({
      debug: false,
      connection: "http://localhost:3000", // socketInstance,
      vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_",
      },
    }),
  );
};
