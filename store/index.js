export const state = () => ({
  user: {},
  messages: [],
  users: [],
});

export const getters = {};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  SOCKET_newMessage(state, msg) {
    state.messages = [...state.messages, msg];
  },
  SOCKET_updateUsers(state, users) {
    state.users = users;
  },
  clearData(state) {
    state.user = {};
    state.messages = [];
    state.users = [];
  },
};

export const actions = {
  // SOCKET_newMessage(ctx, data) {
  //   console.log("Message recieved", data);
  // },
};
