import { io } from "socket.io-client";

const URL = "https://chat-app-wp3k.onrender.com";
const socket = io(URL);

export const state = {
  connected: false,
  fooEvents: [],
  barEvents: [],
};

// import.meta.env.NODE_ENV === "production" ?
//  :  "http://localhost:3000";

socket.on("connect", () => {
  state.connected = true;
  console.log("io connected");
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("foo", (...args) => {
  // state.fooEvents.push(args);
});

socket.on("bar", (...args) => {
  // state.barEvents.push(args);
});

export default socket;
