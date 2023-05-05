import { DeleteOutlined } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "0.5rem",
  p: 4,
  textAlign: "center",
};

export function ModalComment({ postId, idComment, actionUser }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <DeleteOutlined sx={{ cursor: "pointer" }} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Box>
              <InfoIcon sx={{ fontSize: "3rem", color: "#ccc" }} />
              <h2>Deletar</h2>
            </Box>
            <p>Deseja deletar esse comentário?</p>
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="outlined"
              color="success"
              onClick={() => actionUser(postId, idComment)}
            >
              Sim, deletar
            </Button>
            <Button onClick={handleClose} color="error" variant="outlined">
              Cancelar
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
