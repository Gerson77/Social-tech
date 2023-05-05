import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  SendOutlined,
} from "@mui/icons-material";

import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import Friend from "../components/Friend";
import WidgetWrapper from "../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostSingle } from "../state";
import UserImage from "../components/UserImage";
import { useNavigate, useParams } from "react-router-dom";

import { ModalComment } from "../components/ModalComment";

const PostSingle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();

  // Theme
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const token = useSelector((state) => state.token);
  const postSingle = useSelector((state) => state.postSingle);
  const { likes, comments } = useSelector((state) => state.postSingle);

  const userId = useSelector((state) => state.user.id);
  const user = useSelector((state) => state.user);

  const isLiked =likes.find((like) => like === userId);
  
  const [isToogleComments, setIsToggleComments] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  

  const patchLike = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_NODE_API_URL}/post/${postId}/${userId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (postSingle.userId !== user.id) {
      const addLikeNotification = await fetch(
        `${import.meta.env.VITE_NODE_API_URL}/notifications/${user.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "likes",
            firstName: user.firstName,
            userId: postSingle.userId,
            userPicturePath: user.picturePath,
            postPicturePath: picturePath,
            idPost: postId,
          }),
        }
      );

      await addLikeNotification.json();
    }

    await response.json();

    getPost(postId);
  };

  const removeLike = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_NODE_API_URL}/post/${postId}/${userId}/like`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    await response.json();

    getPost(postId);
  };

  const handleComment = async () => {
    if (commentValue === "") return;

    const response = await fetch(
      `${import.meta.env.VITE_NODE_API_URL}/post/${postId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friendId: userId,
          firstName: user.firstName,
          userPicturePath: user.picturePath,
          comment: commentValue,
        }),
      }
    );

    if (postSingle.userId !== user.id) {
      const addCommentsNotification = await fetch(
        `${import.meta.env.VITE_NODE_API_URL}/notifications/${user.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "comments",
            firstName: user.firstName,
            userId: postSingle.userId,
            userPicturePath: user.picturePath,
            postPicturePath: picturePath,
            idPost: postId,
            contentComment: commentValue,
          }),
        }
      );
      await addCommentsNotification.json();
    }

    await response.json();
    setCommentValue("");
    getPost(postId);
  };

  const handleKeyComment = (e) => {
    if (e.key === "Enter" || e.key === "NumPadEnter") {
      handleComment();
    }
  };

  const deleteComments = async (postId, idComment) => {
    const response = await fetch(
      `${
        import.meta.env.VITE_NODE_API_URL
      }/post/${postId}/comments/${idComment}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    await response.json();

    getPost(postId);
  };

  const getPost = async (postId) => {
    const response = await fetch(
      `${import.meta.env.VITE_NODE_API_URL}/post/${postId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const updatedPost = await response.json();
    dispatch(setPostSingle({ postSingle: updatedPost }));
  };

  const getAllCommentsByPost = () => {
    getPost(postId);
    setIsToggleComments(!isToogleComments);
  };

  useEffect(() => {
    getPost(postId);
  }, []);

  return (
    <WidgetWrapper mb="1rem">
      <Friend
        friendId={postSingle.userId}
        name={postSingle.firstName}
        subtitle={postSingle.location}
        userPicturePath={postSingle.userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {postSingle.description}
      </Typography>
      {postSingle.picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${import.meta.env.VITE_NODE_API_URL}/assets/${
            postSingle.picturePath
          }`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            {isLiked ? (
              <IconButton onClick={() => removeLike()}>
                <FavoriteOutlined sx={{ color: primary }} />
              </IconButton>
            ) : (
              <IconButton onClick={() => patchLike()}>
                <FavoriteBorderOutlined />
              </IconButton>
            )}
            <Typography>{likes.length}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => getAllCommentsByPost()}>
              <ChatBubbleOutlineOutlined />
            </IconButton>

            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      <WidgetWrapper sx={{ padding: "0.2rem 0rem" }}>
        <FlexBetween gap="0.5rem">
          <UserImage image={user.picturePath} />
          <InputBase
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            onKeyDown={handleKeyComment}
            placeholder="Digite um comentário..."
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
          <IconButton onClick={handleComment}>
            <SendOutlined />
          </IconButton>
        </FlexBetween>
      </WidgetWrapper>

      {isToogleComments && (
        <Box mt="0.5rem">
          {comments.map(
            ({ id, friendId, firstName, userPicturePath, comment }, index) => (
              <Box key={`${firstName}-${index}`}>
                <Divider />
                <FlexBetween gap="0.5rem" p="0.5rem">
                  <FlexBetween gap="1rem">
                    <Box
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => navigate(`/profile/${friendId}`)}
                    >
                      <UserImage image={userPicturePath} size="35px" />
                    </Box>
                    <Box>
                      <Typography variant="h5">
                        <Typography
                          sx={{
                            display: "inline",
                          }}
                        >
                          {firstName}
                        </Typography>
                        <Typography
                          sx={{
                            color: main,
                            display: "inline",
                            mx: "0.5rem",
                          }}
                        >
                          {comment}
                        </Typography>
                      </Typography>
                    </Box>
                  </FlexBetween>
                  {userId === friendId && (
                    <Box>
                      <ModalComment
                        postId={postId}
                        idComment={id}
                        actionUser={deleteComments}
                      />
                    </Box>
                  )}
                </FlexBetween>
              </Box>
            )
          )}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostSingle;
