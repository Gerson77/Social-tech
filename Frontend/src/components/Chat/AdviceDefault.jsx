import {
  Box,
  ImageList,
  ImageListItem,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import WidgetWrapper from "../WidgetWrapper";

export function AdviceConversationDefault() {
  return (
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
  );
}

export function AdviceMessageDefault() {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const light = palette.neutral.light;

  return (
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
  );
}
