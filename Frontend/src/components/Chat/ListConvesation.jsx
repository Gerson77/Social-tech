import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import FlexBetween from "../FlexBetween";
import { useSelector } from "react-redux";
import UserImage from "../UserImage";
import { useEffect, useState } from "react";

const Conversation = ({ conversationsList }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const [ userConversation, setUserConversation ] = useState()

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const friendId = conversationsList.members.find(m => m !== user.id)

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
      setUserConversation(data)
    };
    getByOneUser()

  }, [conversationsList, user.id])

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
        <>
          <FlexBetween>
            <FlexBetween gap="1rem">
              <UserImage image={userConversation?.picturePath ? userConversation.picturePath : 'userdefault.png'} size="55px" />
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: "0.2rem",
                  }}
                >
                  <Typography
                    sx={{
                      display: "inline",
                    }}
                  >
                    {userConversation?.firstName}
                  </Typography>
                  <Typography
                    sx={{
                      color: main,
                      display: "inline",
                      mx: "0.5rem",
                    }}
                  >
                    Hoje
                  </Typography>
                </Typography>
                <Typography
                  color={medium}
                  fontSize="0.75rem"
                  height="1rem"
                  overflow="hidden"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing ... elit.
                  Quas quis temporibus ut aliquam ipsum! Dolores quae aspernatur
                  accusantium, ducimus rem, iste excepturi sunt dolorum sed
                  quos, amet explicabo nam alias.
                </Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>
        </>
      </WidgetWrapper>
    </Box>
  );
};

export default Conversation;
