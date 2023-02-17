import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Box
} from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";


export const CustomModal = ({ isOpen, handleClose, title, children }) => {
  return (
    <div>
      <Dialog
        open={isOpen}
        fullWidth
        maxWidth="md"
        aria-labelledby="dialog-crud"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle id="dialog-crud">{title}</DialogTitle>
          <IconButton
            aria-label="close"
            size="small"
            onClick={handleClose}
            sx={{
              "&:hover": {
                backgroundColor: "transparent"
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" type="reset">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

CustomModal.prototype = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}
