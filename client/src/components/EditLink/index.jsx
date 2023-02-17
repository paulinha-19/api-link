import React, { useState } from 'react';
import { CustomModal } from '../Custom/CustomModal';
import { CustomForm } from '../Custom/CustomForm';
import { CustomAlert } from '../Custom/CustomAlert';
import { updateLink } from '../../services/requests';
import { showSuccessEdit, showErrorEdit } from '../../utils/reactToastify';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Box } from '@mui/material';
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
                showSuccessEdit();
            },
            onError: (error) => {
                if (!Array.isArray(error.response.data.message)) {
                    showErrorEdit(error.response.data.message)
                }
                const data = error.response.data.message.map(item => {
                    return JSON.stringify(item.message);
                })
                showErrorEdit(data);
            },
            onSettled: () => {
                queryClient.invalidateQueries("getLinks");
            },
        }
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        mutation.mutate();
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
                <CustomForm onSubmit={handleSubmit} url={formLink.url} title={formLink.title} handleChangeInput={handleChangeInput} titleSubmit="Editar"/>
            </CustomModal>
        </Box>
    )
}
