import React, { useState } from 'react';
import { CustomModal } from '../Custom/CustomModal';
import { CustomForm } from "../Custom/CustomForm";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton, Box } from '@mui/material';
import { createLink } from '../../services/requests';
import { useQueryClient, useMutation } from 'react-query';
import { showSuccessSubmit, showErrorSubmit } from '../../utils/reactToastify';
import { CustomAlert } from '../Custom/CustomAlert';


export const AddLink = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClickOpen = () => {
        setIsOpen(true);
    };
    const handleClickClose = () => {
        setIsOpen(false);
    };

    const defaultValues = {
        url: "",
        title: ""
    };
    const [formLink, setFormLink] = useState(defaultValues);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormLink({
            ...formLink,
            [name]: value
        });
    }

    const queryClient = useQueryClient();
    const mutation = useMutation(
        createLink,
        {
            onSuccess: () => {
                showSuccessSubmit();
            },
            onError: (error) => {
                if (!Array.isArray(error.response.data.message)) {
                    showErrorSubmit(error.response.data.message)
                }
                const data = error.response.data.message.map(item => {
                    return JSON.stringify(item.message);
                })
                showErrorSubmit(data);
                mutation.reset();
            },
            onSettled: () => {
                queryClient.invalidateQueries("getLinks");
            },
        }
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        mutation.mutate(formLink);
        setFormLink("");
        handleClickClose();
    };

    if (mutation.error) return <CustomAlert severity="error" variant="filled" titleAlert="Erro" children={mutation.error.message} />

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
                <CustomForm mutation={mutation} onSubmit={handleSubmit} url={formLink.url} title={formLink.title} handleChangeInput={handleChangeInput} titleSubmit="Adicionar" titleLoading="Adicionando..." />
            </CustomModal>
        </Box>
    )
}


