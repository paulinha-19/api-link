import React, { useState } from 'react';
import { CustomModal } from '../CustomModal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton, Box } from '@mui/material';

export const AddLink = () => {
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
                <AddCircleIcon titleAccess='Adicionar' color="success" />
            </IconButton>
            <CustomModal
                isOpen={isOpen}
                handleClose={handleClickClose}
                title="Adicionar link"
            >
                <p>Form Add</p>
            </CustomModal>
        </Box>
    )
}
