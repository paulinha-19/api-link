import React, { useState } from 'react';
import { CustomModal } from '../CustomModal';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Box } from '@mui/material';

export const EditLink = () => {
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
                <EditIcon titleAccess='Editar' color="primary" />
            </IconButton>
            <CustomModal
                isOpen={isOpen}
                handleClose={handleClickClose}
                title="Editar link"
            >
                <p>Edit Form</p>
            </CustomModal>
        </Box>
    )
}
