import React, {useState} from "react";
import {
    Typography,
    Modal,
    Alert,
    AlertTitle,
    IconButton
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    rigth: "0",
    width: 300,
    boxShadow: 24
};

export const CustomAlert = ({ severity, variant, titleAlert, children }) => {
    const [open, setOpen] = useState(true);
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Alert
                severity={severity}
                variant={variant}
                sx={style}
            >
                <IconButton
                    sx={{ position: "absolute", right: 0, top: "8px" }}
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpen(false);
                    }}

                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
                <AlertTitle>{titleAlert}</AlertTitle>
                <Typography>
                    {children}
                </Typography>
            </Alert>
        </Modal>
    );
}
