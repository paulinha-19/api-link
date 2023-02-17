import React, { useState } from 'react';
import { CustomModal } from '../Custom/CustomModal';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Box } from '@mui/material';
import { CustomForm } from '../Custom/CustomForm';
import { updateLink } from '../../services/requests';
import { useQueryClient, useMutation } from 'react-query';

export const EditLink = ({ id, url, title }) => {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const handleClickOpen = () => {
        setIsOpen(true);
    };
    const handleClickClose = () => {
        setIsOpen(false);
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
                alert("DADOS EDITADOS");
            },
            onError: (error) => {
                alert(error.response.data.message);
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
                <CustomForm mutation={mutation} onSubmit={handleSubmit} url={formLink.url} title={formLink.title} handleChangeInput={handleChangeInput} titleSubmit="Editar" titleLoading="Editando..." />
            </CustomModal>
        </Box>
    )
}
