import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import { DeleteOutlined } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const CommentWidget = ({ name, comments, listFriend, index }) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const navigate = useNavigate()

  return (
    <Box key={`${name}-${index}`}>
      <Divider />
      <FlexBetween gap="0.5rem" p="0.5rem">
        <FlexBetween gap="1rem">
            <Box
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/profile/${frienId}`)}
            >
              <UserImage size="35px" />
            </Box>
          <Box>
            <Typography variant="h5">
              <Typography
                sx={{
                  color: main,
                  textAlign: "justify",
                  display: "inline",
                  mx: "0.5rem",
                }}
              >
                {comments}
              </Typography>
            </Typography>
          </Box>
        </FlexBetween>
        <DeleteOutlined sx={{ cursor: "pointer" }} />
      </FlexBetween>
    </Box>
  );
};

export default CommentWidget;
