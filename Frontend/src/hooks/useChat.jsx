import { useEffect, createRef, useState } from "react";
import { useSelector } from "react-redux";

import io from "socket.io-client";
const socket = io.connect("http://192.168.0.9:3001");

export default function useChat() {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  // inicia um conversa
  const [friend, setFriend] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [conversation, setConversation] = useState([]);

  // ConversationFriend
  const scrollRef = createRef();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Todas as mensagens
  const [latestMessage, setLatestMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const getAllMessagesLoad = async (conversationsList) => {
    const response = await fetch(
      `${import.meta.env.VITE_NODE_API_URL}/messages/${conversationsList.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    setLatestMessage(data);
  };

  // Adiciona a próxima conversa nas lista
  const handleConversation = async (senderId, receiverId) => {
    const dataPreLoad = {
      id: "000000001",
      members: [senderId, receiverId],
      latestMessage: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const verifyConversationExist = await getOneConversation(
      senderId,
      receiverId
    );

    const conversationExists = conversation.find(
      (conversationCurrent) =>
        conversationCurrent.id === verifyConversationExist.id
    );

    const dataPreLoadExists = conversation.find(
      (conversationCurrent) => conversationCurrent.id === dataPreLoad.id
    );

    if (!conversationExists && !dataPreLoadExists) {
      setConversation([...conversation, dataPreLoad]);
      await getByOneUser(dataPreLoad);
      return;
    }

    await getAllConversation(senderId);
    await getByOneUser(conversationExists || dataPreLoadExists);
  };

  // get one Conversation
  const getOneConversation = async (senderId, receiverId) => {
    const response = await fetch(
      `${
        import.meta.env.VITE_NODE_API_URL
      }/conversation/${senderId}/${receiverId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    return result;
  };

  // obtem os dados do usuário clicado
  const getByOneUser = async (dataFriend) => {
    const friendId = dataFriend.members.find((f) => f !== user.id);

    const response = await fetch(
      `${import.meta.env.VITE_NODE_API_URL}/users/${friendId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    // seta os dados do amigo especificado
    setFriend(data);
    setCurrentChat(dataFriend);
  };

  // pega todas as conversa do usuário logado
  const getAllConversation = async (idUser) => {
    const response = await fetch(
      `${import.meta.env.VITE_NODE_API_URL}/conversation/${idUser}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    setConversation(data);
  };

  // Carrega todas as conversas
  useEffect(() => {
    getAllConversation(user.id);
  }, [user.id]);

  // envia uma nova menssagem
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    const conversationId = await createNewConversation(user.id, friend.id);

    const receiverId = currentChat.members.find((member) => member !== user.id);

    const response = await fetch(
      `${import.meta.env.VITE_NODE_API_URL}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: conversationId.id,
          senderId: user.id,
          messageContent: newMessage,
        }),
      }
    );

    const result = await response.json();

    socket.emit("sendMessage", {
      ...result,
      receiverId,
    });

    setMessages([...messages, result]);
    setNewMessage("");
  };

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        conversationId: data.conversationId,
        messageContent: data.messageContent,
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.emit("addUser", user.id, conversation.id);
    socket.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [user]);

  // recupera todas as mensagem da conversa
  const getAllMessages = async (currentChat) => {
    const response = await fetch(
      `${import.meta.env.VITE_NODE_API_URL}/messages/${currentChat?.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    setMessages(data);
  };

  // Carrega todas as messagens das conversas
  useEffect(() => {
    getAllMessages(currentChat);
  }, [currentChat]);

  const handleKeyEnter = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      return handleSubmit(e);
    }
  };

  // criar uma nova conversa
  const createNewConversation = async (senderId, receiverId) => {
    const response = await fetch(
      `${import.meta.env.VITE_NODE_API_URL}/conversation`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: senderId,
          receiverId: receiverId,
        }),
      }
    );

    const result = await response.json();
    return result;
  };

  // Obtem os dados do amigo e limpa conversas não iniciadas
  const getConvesationCurrent = async (conversationValue) => {
    await getByOneUser(conversationValue);
    await getAllConversation(user.id);
  };

  return {
    handleConversation,
    getConvesationCurrent,
    handleKeyEnter,
    conversation,
    currentChat,
    friend,
    messages,
    newMessage,
    setNewMessage,
    handleSubmit,
    scrollRef,
    getAllMessages,
    latestMessage,
    getAllMessagesLoad,
  };
}
