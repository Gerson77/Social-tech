import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  InputBase,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Navbar from "../../scenes/navbar";
import WidgetWrapper from "../WidgetWrapper";
import FlexBetween from "../FlexBetween";
import { useSelector } from "react-redux";
import ListConversation from "./ListConvesation";
import FriendsOnline from "./FriendsOnline";
import UserImage from "../UserImage";
import { MessageLeft, MessageRight } from "./Message";
import { SendOutlined } from "@mui/icons-material";

const Chat = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const light = palette.neutral.light;
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  // inicia um conversa
  const [friend, setFriend] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [newConversation, setNewConversation] = useState({
    id: "000000001",
    members: ["senderId", "receiverId"],
  });

  // ConversationFriend
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Adiciona a próxima conversa nas lista
  const handleConversation = async (senderId, receiverId) => {
    const dataPreLoad = {
      id: "000000001",
      members: [senderId, receiverId],
    };

    const verifyConversationExist = await getOneConversation(
      senderId,
      receiverId
    );
    setNewConversation(verifyConversationExist);

    const conversationExists = conversation.find(
      (seila) => seila.id === verifyConversationExist.id
    );

    if (!conversationExists) {
      setConversation([...conversation, dataPreLoad]);
      await getByOneUser(dataPreLoad);
      return;
    }

    await getAllConversation(senderId);
    await getByOneUser(conversationExists);
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

    setMessages([...messages, result]);
    setNewMessage("");
  };

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

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

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

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box
          flexBasis={isNonMobileScreens ? "26%" : undefined}
          backgroundColor={light}
          p="0.5rem"
          borderRadius="0.5rem"
        >
          <FlexBetween m="1rem 0.5rem">
            <Typography color={dark} variant="h5" fontWeight="500">
              Conversas
            </Typography>
          </FlexBetween>
          <Divider />
          {conversation.length > 0 ? (
            <>
              {conversation.map((conversationValue) => (
                <Box key={conversationValue.id}>
                  <Box onClick={() => getConvesationCurrent(conversationValue)}>
                    <ListConversation conversationsList={conversationValue} />
                  </Box>
                </Box>
              ))}
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                height: "76vh",
                textAlign: "center",
                borderRadius: "0.5rem",
              }}
            >
              <ImageList
                sx={{
                  width: "20rem",
                  display: "flex",
                }}
              >
                <ImageListItem>
                  <img
                    src={`${
                      import.meta.env.VITE_NODE_API_URL
                    }/assets/conversations.png`}
                    alt=""
                  />
                </ImageListItem>
              </ImageList>
              <Typography variant="h4">Inicie uma conversa</Typography>
            </Box>
          )}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          sx={{
            backgroundColor: palette.background.alt,
            borderRadius: "0.5rem",
          }}
        >
          {currentChat ? (
            <>
              <Box height="auto" minHeight="84vh">
                <WidgetWrapper>
                  <FlexBetween>
                    <FlexBetween gap="1rem">
                      <UserImage image={friend.picturePath} size="55px" />
                      <Box>
                        <Typography
                          color={main}
                          variant="h5"
                          fontWeight="500"
                          sx={{
                            "&:hover": {
                              color: palette.primary.light,
                              cursor: "pointer",
                            },
                          }}
                        >
                          {friend.firstName}
                        </Typography>
                      </Box>
                    </FlexBetween>
                  </FlexBetween>
                </WidgetWrapper>
                <WidgetWrapper>
                  <Paper
                    sx={{
                      height: "60vh",
                      maxHeight: "600px",
                      display: "flex",
                      alignItems: "center",
                      alignContent: "flex-end",
                      position: "relative",
                    }}
                  >
                    <Paper
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignContent: "flex-end",
                        flexDirection: "column",
                        m: "0rem",
                        overflowY: "scroll",
                        height: "100%",
                        p: "0.5rem",
                      }}
                    >
                      {messages.map((messageTarget) => (
                        <Box key={messageTarget.id} ref={scrollRef}>
                          {messageTarget.senderId !== user.id ? (
                            <MessageLeft
                              message={messageTarget.messageContent}
                              timestamp={messageTarget.createdAt}
                              photoURL={friend.picturePath}
                              displayName={friend.firstName}
                            />
                          ) : (
                            <MessageRight
                              message={messageTarget.messageContent}
                              timestamp={messageTarget.createdAt}
                              photoURL={friend.picturePath}
                              displayName={friend.firstName}
                            />
                          )}
                        </Box>
                      ))}
                    </Paper>
                  </Paper>
                </WidgetWrapper>

                <WidgetWrapper sx={{ padding: "1rem 1.5rem" }}>
                  <FlexBetween gap="0.5rem">
                    <UserImage image={user.picturePath} />
                    <InputBase
                      placeholder="Digite sua menssagem..."
                      sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                      }}
                      onKeyDown={handleKeyEnter}
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    />
                    <IconButton onClick={handleSubmit}>
                      <SendOutlined />
                    </IconButton>
                  </FlexBetween>
                </WidgetWrapper>
              </Box>
            </>
          ) : (
            <Box height="auto" minHeight="84vh">
              <WidgetWrapper
                sx={{
                  width: "100%",
                  height: "84vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: `radial-gradient(circle, ${light} 0%, ${palette.background.alt} 100%)`,
                }}
              >
                <ImageList
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    ml: "8rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <ImageListItem>
                    <img
                      src={`${
                        import.meta.env.VITE_NODE_API_URL
                      }/assets/beginnerconversation.png`}
                      alt=""
                    />
                  </ImageListItem>
                </ImageList>
                <Typography variant="h4" pb="6rem">
                  Selecione um amigo para iniciar a conversa!
                </Typography>
              </WidgetWrapper>
            </Box>
          )}
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "26%" : undefined}
          sx={{
            backgroundColor: palette.background.alt,
            p: "0.5rem",
            borderRadius: "0.5rem",
          }}
        >
          <Typography
            color={dark}
            variant="h5"
            fontWeight="500"
            p="1rem 0.3rem"
          >
            Lista de Amigos
          </Typography>
          {user.friends.map(({ id, picturePath, firstName, occupation }) => (
            <Box key={id} onClick={() => handleConversation(user.id, id)}>
              <FriendsOnline
                id={id}
                picturePath={picturePath}
                firstName={firstName}
                occupation={occupation}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
