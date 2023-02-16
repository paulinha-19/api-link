import React, { useState } from 'react';
import { CustomModal } from '../Custom/CustomModal';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Box } from '@mui/material';
import { CustomForm } from '../Custom/CustomForm';
import { updateLink } from '../../services/requests';
import { useQueryClient, useMutation, useQuery } from 'react-query';

export const EditLink = ({ updateData, id, url, title, setSelectedLink }) => {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const handleClickOpen = () => {
        setIsOpen(true);
    };
    const handleClickClose = () => {
        setIsOpen(false);
        setSelectedLink(null);
    };

    const defaultValues = {
        url: url || "",
        title: title || ""
    };
    const [formLink, setFormLink] = useState(defaultValues);
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormLink({
            ...formLink,
            [name]: value
        });
    }

    const mutation = useMutation(
        () => updateLink(id, formLink),
        {
            onSuccess: () => {
                alert("SUCESSO AO EDITAR");
            },
            onError: (error) => {
                alert(error);
                mutation.reset();
            },
            onSettled: () => {
                queryClient.invalidateQueries("getLinks");
            },
        }
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        mutation.mutate();
        setFormLink("");
        handleClickClose();
    };

    const editLink = () => {
        handleClickOpen();
        updateData
    }

    return (
        <Box>
            <IconButton onClick={editLink}>
                <EditIcon titleAccess='Editar' color="primary" />
            </IconButton>
            <CustomModal
                isOpen={isOpen}
                handleClose={handleClickClose}
                title="Editar link"
            >
                <CustomForm mutation={mutation} onSubmit={handleSubmit} url={formLink.url} title={formLink.title} handleChangeInput={handleChangeInput} />
            </CustomModal>
        </Box>
    )
}
