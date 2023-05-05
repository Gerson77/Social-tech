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
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";
import UserImage from "../../components/UserImage";
import { useNavigate } from "react-router-dom";

import { ModalComment } from "../../components/ModalComment";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  // const commentsGetAll = useSelector((state) => state.comments);
  const [commentsGetAll, setCommentsGetAll] = useState([]);

  const userId = useSelector((state) => state.user.id);
  const user = useSelector((state) => state.user);

  const likeCount = likes.length;
  const isLiked = likes.find((like) => like === userId);

  const [commentValue, setCommentValue] = useState("");

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

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

    if (postUserId !== user.id) {
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
            userId: postUserId,
            userPicturePath: user.picturePath,
            postPicturePath: picturePath,
            idPost: postId,
          }),
        }
      );

      await addLikeNotification.json();
    }

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
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
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
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

    if (postUserId !== user.id) {
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
            userId: postUserId,
            userPicturePath: user.picturePath,
            postPicturePath: picturePath,
            idPost: postId,
            contentComment: commentValue,
          }),
        }
      );
      await addCommentsNotification.json();
    }

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setCommentValue("");
    getComments(postId);
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

    getComments(postId)
  };

  const getComments = async (postId) => {
    const response = await fetch(
      `${import.meta.env.VITE_NODE_API_URL}/posts/comments/${postId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setCommentsGetAll(data);
  };

  const getAllCommentsByPost = () => {
    getComments(postId);
    setIsComments(!isComments);
  };

  useEffect(() => {
    getComments(postId);
  }, []);

  return (
    <WidgetWrapper mb="1rem">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${import.meta.env.VITE_NODE_API_URL}/assets/${picturePath}`}
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
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => getAllCommentsByPost()}>
              <ChatBubbleOutlineOutlined />
            </IconButton>

            <Typography>{commentsGetAll.length}</Typography>
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

      {isComments && (
        <Box mt="0.5rem">
          {commentsGetAll.map(
            ({ id, friendId, firstName, userPicturePath, comment }, index) => (
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

export default PostWidget;
