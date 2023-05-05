import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  Menu,
  MenuList,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications, setPostSingle } from "../state";
import { useState } from "react";

const BasicMenu = ({ open, anchorEl, handleClose, menuItens }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const getPost = async (idPost, idNotification, userId) => {
    const response = await fetch(
      `${import.meta.env.VITE_NODE_API_URL}/post/${idPost}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const infoPost = await response.json();
    dispatch(setPostSingle({ postSingle: infoPost }));

    await updateNotificationView(idNotification);
    await getNotification(userId);

    navigate(`/post/${idPost}`);
  };

  const updateNotificationView = async (idNotification) => {
    const updateNotification = await fetch(
      `${import.meta.env.VITE_NODE_API_URL}/notifications/${idNotification}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          body: {
            status: true,
          },
        },
      }
    );

    const data = await updateNotification.json();
    return data;
  };

  const getNotification = async (userId) => {
    const response = await fetch(
      `${import.meta.env.VITE_NODE_API_URL}/notifications/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    const notficationsReverse = result.reverse();
    dispatch(setNotifications({ notifications: notficationsReverse }));
  };

  async function followNotification(id, userId, idFriend) {
    await updateNotificationView(id);
    await getNotification(userId);
    navigate(`/profile/${idFriend}`);
  }

  const formatDate = (day) => {
    const date = new Date(day);

    const dayName = new Array(
      "domingo",
      "segunda",
      "terça",
      "quarta",
      "quinta",
      "sexta",
      "sábado"
    );
    const monName = new Array(
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "agosto",
      "outubro",
      "novembro",
      "dezembro"
    );

    return `${dayName[date.getDay()]}, ${date.getDate()} de ${
      monName[date.getMonth()]
    } de ${date.getFullYear()}`;
  };

  const [isheaderNot, setIsHeaderNot] = useState(false);

  const dataHoje = new Date();

  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <List sx={{ px: 0 }}>
          {menuItens.map(
            ({
              id,
              idPost,
              action,
              firstName,
              postPicturePath,
              userPicturePath,
              contentComment,
              idFriend,
              userId,
              createdAt,
            }) => (
              <MenuList key={id} sx={{ width: 380, maxWidth: "100%", p: 0 }}>
                <Box key={id}>
                  {/* {formatDate(createdAt) === formatDate(dataHoje) ? (
                      <ListSubheader sx={{ bgcolor: "background.paper" }}>
                        Hoje
                      </ListSubheader>
                  ) : (
                    <ListSubheader sx={{ bgcolor: "background.paper" }}>
                      {formatDate(createdAt)}
                    </ListSubheader>
                  )} */}

                  <div onClick={handleClose}>
                    {action !== "follow" ? (
                      <ListItem
                        button
                        onClick={() => getPost(idPost, id, userId)}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt="Profile Picture"
                            src={`${
                              import.meta.env.VITE_NODE_API_URL
                            }/assets/${userPicturePath}`}
                          />
                        </ListItemAvatar>

                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h5">
                            <Typography
                              sx={{
                                display: "inline",
                              }}
                            >
                              {firstName}
                            </Typography>
                            {action === "follow" && (
                              <Typography
                                sx={{
                                  color: "#999",
                                  display: "inline",
                                  mx: "0.5rem",
                                }}
                              >
                                começou a seguir você
                              </Typography>
                            )}

                            {action === "likes" && (
                              <Typography
                                sx={{
                                  color: "#999",
                                  display: "inline",
                                  mx: "0.5rem",
                                }}
                              >
                                curtiu sua publicação
                              </Typography>
                            )}

                            {action === "comments" && (
                              <Typography
                                sx={{
                                  color: "#999",
                                  display: "inline",
                                  mx: "0.5rem",
                                }}
                              >
                                {`comentou: ${contentComment}`}
                              </Typography>
                            )}
                          </Typography>

                          {postPicturePath === null ? (
                            <FavoriteBorderIcon />
                          ) : (
                            <Avatar
                              src={`${
                                import.meta.env.VITE_NODE_API_URL
                              }/assets/${postPicturePath}`}
                              variant="square"
                            />
                          )}
                        </Box>
                      </ListItem>
                    ) : (
                      <ListItem
                        button
                        onClick={() => followNotification(id, userId, idFriend)}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt="Profile Picture"
                            src={`${
                              import.meta.env.VITE_NODE_API_URL
                            }/assets/${userPicturePath}`}
                          />
                        </ListItemAvatar>

                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
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
                                color: "#999",
                                display: "inline",
                                mx: "0.5rem",
                              }}
                            >
                              começou a seguir você
                            </Typography>
                          </Typography>

                          {postPicturePath === null ? (
                            <FavoriteBorderIcon />
                          ) : (
                            <Avatar
                              src={`${
                                import.meta.env.VITE_NODE_API_URL
                              }/assets/${postPicturePath}`}
                              variant="square"
                            />
                          )}
                        </Box>
                      </ListItem>
                    )}

                    {formatDate(createdAt) === formatDate(dataHoje) ? (
                      <Typography sx={{ ml: "1em", color: "#5e5e5e" }}>
                        Hoje
                      </Typography>
                    ) : (
                      <Typography sx={{ ml: "1em", color: "#5e5e5e" }}>
                        {formatDate(createdAt)}
                      </Typography>
                    )}
                  </div>
                </Box>
                <Divider />
              </MenuList>
            )
          )}
        </List>
      </Menu>
    </div>
  );
};

export default BasicMenu;
