import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import FlexBetween from "../FlexBetween";
import UserImage from "../UserImage";
import { SendOutlined } from "@mui/icons-material";
import { MessageLeft, MessageRight } from "./Message";
import { useSelector } from "react-redux";

const ConversationFriend = ({ firstName, picturePath, currentChat, event }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const light = palette.neutral.light;

  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_NODE_API_URL}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: currentChat.id,
          senderId: currentChat.senderId,
          messageContent: newMessage,
        }),
      }
    );

    const result = await response.json();

    setMessages([...messages, result]);
  };

  const handleKeyEnter = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      return handleSubmit(e);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const getAllMessages = async () => {
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
  useEffect(() => {
    getAllMessages();
  }, [currentChat]);

  return (
    <Box height="auto" minHeight="84vh">
      <WidgetWrapper>
        <FlexBetween>
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} size="55px" />
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
                {firstName}
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
                    photoURL={picturePath}
                    displayName={firstName}
                  />
                ) : (
                  <MessageRight
                    message={messageTarget.messageContent}
                    timestamp={messageTarget.createdAt}
                    photoURL={picturePath}
                    displayName={firstName}
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
  );
};

export default ConversationFriend;
