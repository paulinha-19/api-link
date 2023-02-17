import React, { useState } from 'react';
import { CustomModalDelete } from '../Custom/CustomModalDelete';
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
        deleteData
        mutation.mutate();
        handleClickClose();
    }

    return (
        <Box>
            <IconButton onClick={handleClickOpen}>
                <DeleteIcon titleAccess='Deletar' color="error" />
            </IconButton>
            <CustomModalDelete
                isOpen={isOpen}
                handleClose={handleClickClose}
                onConfirm={removeLink}
            >
                Você deseja mesmo deletar os dados?
            </CustomModalDelete>
        </Box>
    )
}
