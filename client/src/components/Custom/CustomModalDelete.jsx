import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    Box
} from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";


export const CustomModalDelete = ({ isOpen, handleClose, children, onConfirm }) => {
    return (
        <div>
            <Dialog
                open={isOpen}
                fullWidth
                aria-labelledby="dialog-crud"
            >
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
                <DialogContent sx={{ fontWeight: "bold", textAlign: "center" }}>
                    {children}
                </DialogContent>
                <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button onClick={() => { handleClose(); onConfirm(); }} color="primary">
                        Sim
                    </Button>
                    <Button onClick={handleClose} color="error">
                        Não
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

CustomModalDelete.prototype = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
}
