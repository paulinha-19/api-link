import React, { useState } from 'react';
import { CustomModal } from '../Custom/CustomModal';
import { deleteLink } from '../../services/requests';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Box } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';

export const DeleteLink = ({ deleteData, link }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClickOpen = () => {
        setIsOpen(true);
    };
    const handleClickClose = () => {
        setIsOpen(false);
    };
    const queryClient = useQueryClient();
    const mutation = useMutation(
        deleteLink(link),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("getLinks")
                alert("LINK DELETADO");
            },
            onError: (error) => {
                alert(error);
                mutation.reset();
            },
        }
    );

    const removeLink = () => {
        deleteData();
        mutation.mutate(link);
    }

    return (
        <Box>
            <IconButton onClick={removeLink}>
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
