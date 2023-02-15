import React, { useState } from 'react';
import { CustomModal } from '../CustomModal';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Box } from '@mui/material';

export const DeleteLink = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleClickClose = () => {
        setIsOpen(false);
    };

    return (
        <Box>
            <IconButton onClick={handleClickOpen}>
                <DeleteIcon titleAccess='Deletar' color="error" />
            </IconButton>
            <CustomModal
                isOpen={isOpen}
                handleClose={handleClickClose}
                title="Deletar link"
            >
                <p>Form delete</p>
            </CustomModal>
        </Box>
    )
}
