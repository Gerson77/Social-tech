import { io } from "./http";

interface ChatUser {
  socket_id: string;
  userId: string;
}

let users: ChatUser[] = [];

const addUser = (userId: string, socket_id: string) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socket_id});
};

const removeUser = (sockectId: string) => {
  users = users.filter((user) => user.socket_id !== sockectId);
};

const getUser = (userId: string) => {
  return users.find((user) => user.userId === userId)
}

io.on("connection", (socket) => {
  // Conectado
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Enviar e pegar mensagens
  socket.on("sendMessage", (data) => {
    const user = getUser(data.receiverId)
    if(!user?.socket_id) return
    io.to(user?.socket_id).emit("getMessage", data);
  });

  // Desconectado
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
