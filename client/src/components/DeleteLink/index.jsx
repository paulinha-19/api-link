import React, { useState } from 'react';
import { CustomModalDelete } from '../Custom/CustomModalDelete';
import { deleteLink } from '../../services/requests';
import { showErrorDelete, showSuccessDelete } from '../../utils/reactToastify';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Box } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';

export const DeleteLink = ({ id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClickOpen = () => {
        setIsOpen(true);
    };
    const handleClickClose = () => {
        setIsOpen(false);
    };
    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation(deleteLink,
        {
            onSuccess: () => {
                showSuccessDelete();
            },
            onError: (error) => {
                showErrorDelete(error.message)
                mutation.reset();
            },
            onSettled: () => {
                queryClient.invalidateQueries("getLinks");
            },
        }
    );

    const removeLink = async () => {
        await mutateAsync(id);
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
