import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import FlexBetween from "../FlexBetween";
import { useSelector } from "react-redux";
import UserImage from "../UserImage";
import { useEffect, useState } from "react";
import useChat from "../../hooks/useChat";

const Conversation = ({ conversationsList }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const { latestMessage, getAllMessagesLoad } = useChat(conversationsList)

  const [userConversation, setUserConversation] = useState();

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);


  const lastMessage = latestMessage.find(
    (message) => message.id === conversationsList.latestMessage
  );

  useEffect(() => {
    const friendId = conversationsList.members.find((m) => m !== user.id);

    const getByOneUser = async () => {
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
      setUserConversation(data);
    };
    getByOneUser();
  }, [conversationsList, user.id]);

  useEffect(() => {
    getAllMessagesLoad(conversationsList);
  }, [conversationsList]);

  return (
    <Box>
      <WidgetWrapper
        mb="1rem"
        sx={{
          "&:hover": {
            backgroundColor: palette.primary.light,
            cursor: "pointer",
          },
        }}
      >
        <FlexBetween>
          <FlexBetween gap="1rem" width="100%">
            <UserImage
              image={
                userConversation?.picturePath
                  ? userConversation.picturePath
                  : "userdefault.png"
              }
              size="55px"
            />
            <Box
              sx={{
                width: "100%",
                mb: "0.2rem",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  mb: "0.2rem",
                }}
              >
                <Typography>{userConversation?.firstName}</Typography>
                <Typography
                  sx={{
                    color: main,
                    mx: "0.5rem",
                  }}
                >
                  {latestMessage ? (
                    <>
                      {new Date(conversationsList?.updatedAt).getHours() +
                        ":" +
                        new Date(conversationsList?.updatedAt).getMinutes()}
                    </>
                  ) : (
                    ""
                  )}
                </Typography>
              </Box>
              <Typography
                color={medium}
                fontSize="0.75rem"
                height="1rem"
                overflow="hidden"
              >
                {lastMessage
                  ? lastMessage.messageContent.length > 47
                    ? lastMessage.messageContent.substring(0, 50) + " . . ."
                    : lastMessage.messageContent
                  : ""}
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </WidgetWrapper>
    </Box>
  );
};

export default Conversation;
