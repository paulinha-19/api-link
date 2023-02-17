import React, { useState } from 'react';
import { CustomModal } from '../Custom/CustomModal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton, Box } from '@mui/material';
import { CustomForm } from "../Custom/CustomForm";
import { createLink } from '../../services/requests';
import { useQueryClient, useMutation } from 'react-query';


export const AddLink = ({ error }) => {
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
                alert("DADOS CRIADOS");
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
        mutation.mutate(formLink);
        setFormLink("");
        handleClickClose();
    };

    if (mutation.isLoading) return <div>Loading...</div>;
    if (mutation.isError) return <div>An error has occurred: {mutation.error.message}</div>;

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
