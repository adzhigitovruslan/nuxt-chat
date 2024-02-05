/* eslint-disable import/order */
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const Users = require("../utils/users")();
const Message = require("../utils/message");
const m = (name, message, id) => ({ name, message, id });

io.on("connection", (socket) => {
  socket.on("userJoined", (data, cb) => {
    if (!data.name || !data.room) {
      return cb("Data doesn't exist");
    }

    socket.join(data.room);
    Users.removeUser(socket.id);
    Users.addUser({
      id: socket.id,
      name: data.name,
      room: data.room,
    });
    cb({ userId: socket.id });
    io.to(data.room).emit("updateUsers", Users.getUsersByRoom(data.room));
    socket.emit("newMessage", m("admin", `Welcome ${data.name}`));
    socket.broadcast
      .to(data.room)
      .emit("newMessage", m("admin", `User ${data.name} joined`));
  });

  socket.on("createMessage", (data, cb) => {
    if (!data.message) {
      return cb("Текст не может быть пустым");
    }
    const user = Users.getUser(data.id);
    if (user) {
      io.to(user.room).emit("newMessage", m(user.name, data.message, data.id));
    }
    cb();
  });

  socket.on("onLeave", (id, cb) => {
    const user = Users.getUser(id);

    if (user) {
      Users.removeUser(id);
      // socket.leave(user.room);
      io.to(user.room).emit("updateUsers", Users.getUsersByRoom(user.room));
      io.to(user.room).emit(
        "newMessage",
        m("Admin", `User ${user.name} left chat`),
      );
    }
    cb();
  });

  socket.on("disconnect", () => {
    const user = Users.getUser(socket.id);

    if (user) {
      Users.removeUser(socket.id);
      io.to(user.room).emit("updateUsers", Users.getUsersByRoom(user.room));
      io.to(user.room).emit(
        "newMessage",
        m("Admin", `User ${user.name} left chat`),
      );
    }
  });
});

module.exports = { app, server };
