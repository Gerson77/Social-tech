import React from "react";
import { Box, Typography } from "@mui/material";
import { format } from 'timeago.js'


export const MessageRight = ({ message, timestamp }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          position: "relative",
          marginRight: "20px",
          marginBottom: "10px",
          padding: "10px",
          backgroundColor: "#da810b",
          width: "auto",
          maxWidth: '60%',
          p: "1rem",
          m: "1rem",
          textAlign: "left",
          font: "400 .9em 'Open Sans', sans-serif",
          border: "1px solid #995700",
          borderRadius: "10px",
          "&:after": {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: "15px solid #da810b",
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            top: "0",
            right: "-15px",
          },
          "&:before": {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: "17px solid #995700",
            borderLeft: "16px solid transparent",
            borderRight: "16px solid transparent",
            top: "-1px",
            right: "-17px",
          },
        }}
      >
        <Box>
          <Typography>{message}</Typography>
          <Typography
            sx={{
              width: '6rem',
              position: "absolute",
              fontSize: ".85em",
              fontWeight: "300",
              bottom: "-18px",
              right: "0",
            }}
            variant="body1"
          >
            {format(timestamp)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const MessageLeft = ({ message, timestamp }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          p: "1rem",
          m: "1rem",
          maxWidth: "60%",
          width: "auto",
          position: "relative",
          backgroundColor: "#6ebbeb",
          border: "1px solid #3d92c7",

          borderRadius: "10px",
          "&:after": {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: "15px solid #6ebbeb",
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            top: "0",
            left: "-15px",
          },
          "&:before": {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: "17px solid #3d92c7",
            borderLeft: "16px solid transparent",
            borderRight: "16px solid transparent",
            top: "-1px",
            left: "-17px",
          },
        }}
      >
        <Box>
          <Typography>{message}</Typography>
          <Typography
            sx={{
              width: '6rem',
              position: "absolute",
              fontSize: ".85em",
              fontWeight: "300",
              margin: "6px 2px",
              bottom: "-24px",
              left: "0px",
            }}
          >
             {format(timestamp)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
