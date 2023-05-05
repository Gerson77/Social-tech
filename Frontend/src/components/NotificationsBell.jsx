import { Notifications } from "@mui/icons-material";
import { Badge, IconButton, Tooltip } from "@mui/material";
import BasicMenu from "./BasicMenu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../state";

const NotificationsBell = ({ userId }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [boxtoogle, setBoxToogle] = useState(null);
  const token = useSelector((state) => state.token);

  const notifications = useSelector((state) => state.notifications);
  

  const handleOpen = (event) => {
    setBoxToogle(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAllNotifications = async () => {
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

    const notificationResult = await response.json();
    const notficationsReverse = notificationResult.reverse()
    dispatch(setNotifications({ notifications: notficationsReverse }));
  };

  const notificationNotView = notifications.filter(
    (notificationView) => notificationView.status === false
  );

  useEffect(() => {
    getAllNotifications();
  }, []);

  return (
    <div>
      <Tooltip
        title={
          notificationNotView.length
            ? `Você tem ${notificationNotView.length} notificação não lidas`
            : "Sem notificações novas"
        }
      >
        <IconButton onClick={handleOpen} boxtoogle={boxtoogle}>
          {notificationNotView && (
            <Badge
              badgeContent={notificationNotView.length}
              color="error"
              max={99}
            >
              <Notifications color="action" sx={{ fontSize: "25px" }} />
            </Badge>
          )}
        </IconButton>
      </Tooltip>
      <BasicMenu
        open={open}
        anchorEl={boxtoogle}
        handleClose={handleClose}
        menuItens={notifications}
      />
    </div>
  );
};

export default NotificationsBell;
