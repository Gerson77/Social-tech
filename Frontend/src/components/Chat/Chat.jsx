import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Divider,
  ImageList,
  ImageListItem,
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
import ConversationFriend from "./ConversationFriend";

const Chat = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const light = palette.neutral.light;
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  // inicia um conversa
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [friend, setFriend] = useState([]);

  const handleConversation = async (senderId, receiverId) => {
    // const response = await fetch(
    //   `${import.meta.env.VITE_NODE_API_URL}/conversation`,
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       senderId: senderId,
    //       receiverId: receiverId,
    //     }),
    //   }
    // );

    // const result = await response.json();

    // await getAllConversation(user.id);

    const result = {
      id: '64549e-ID-FAKE-4dd2970000',
      senderId: senderId,
      receiverId: receiverId,
      members: [senderId, receiverId]
    }

    const conversationExists = conversation.find((conver) => conver.receiverId === receiverId)

    if(!conversationExists) {
      setConversation([...conversation, result]);
      
      await getByOneUser(result)
    } else {
      await getByOneUser(result)
      await getAllConversation(user.id);
    }

    console.log(currentChat)
  };

  const getByOneUser = async (c) => {
    const response = await fetch(
      `${import.meta.env.VITE_NODE_API_URL}/users/${c.receiverId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    setCurrentChat(c);
    setFriend(data);
    // await getAllConversation(user.id);
  };

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
  useEffect(() => {
    getAllConversation(user.id);
  }, [user.id]);


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
              {conversation.map((c) => (
                <Box key={c.id}>
                  <Box onClick={() => getByOneUser(c)}>
                    <ListConversation conversationsList={c} />
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
            <ConversationFriend
              firstName={friend.firstName}
              currentChat={currentChat}
              picturePath={friend.picturePath}
            />
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
                onClick={() => actionUser()}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
