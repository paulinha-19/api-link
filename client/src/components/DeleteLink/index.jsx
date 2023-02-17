import React, { useState } from 'react';
import { CustomModalDelete } from '../Custom/CustomModalDelete';
import { deleteLink } from '../../services/requests';
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
    const {mutateAsync} = useMutation(deleteLink);

    const removeLink = async () => {
        await mutateAsync(id)
        queryClient.invalidateQueries("getLinks")
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
