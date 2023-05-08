import React from "react";
import {
  Box,
  Divider,
  IconButton,
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
import useChat from "../../hooks/useChat";
import {
  AdviceConversationDefault,
  AdviceMessageDefault,
} from "./AdviceDefault";

export default function Chat() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const light = palette.neutral.light;

  const user = useSelector((state) => state.user);

  const {
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
  } = useChat();

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
            // message default
            <AdviceConversationDefault />
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
            // Adivice message
            <AdviceMessageDefault />
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
}
