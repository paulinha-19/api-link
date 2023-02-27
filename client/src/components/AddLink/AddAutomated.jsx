import React, { useState } from 'react';
import { CustomModal } from '../Custom/CustomModal';
import { CustomFormAut } from '../Custom/CustomFormAut';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button } from '@mui/material';
import { createLinkAutomated } from '../../services/requests';
import { useQueryClient, useMutation } from 'react-query';
import { showSucessSubmitAutomated, showErrorDelete, showErrorSubmit } from '../../utils/reactToastify';


export const AddAutomated = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClickOpen = () => {
        setIsOpen(true);
    };
    const handleClickClose = () => {
        setIsOpen(false);
    };

    const defaultValues = {
        url: "https://devgo.com.br",
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
        createLinkAutomated,
        {
            onSuccess: (data) => {
                console.log(data)
                data.data.forEach(item => {
                    const { title, url } = item;
                    showSucessSubmitAutomated({ title, url });
                })
            },
            onError: (error) => {
                showErrorSubmit(error.response.data.message);
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
        handleClickClose();
    }

    return (
        <Box>
            <Button sx={{ mt: 2 }} onClick={handleClickOpen} startIcon={<AddCircleIcon />} title="Adicionar" color="primary" variant="contained">
                Automatizado
            </Button>
            <CustomModal
                isOpen={isOpen}
                handleClose={handleClickClose}
                title="Adicionar link"
            >
                <CustomFormAut mutation={mutation} onSubmit={handleSubmit} url={formLink.url} handleChangeInput={handleChangeInput} titleSubmit="Adicionar" />
            </CustomModal>
        </Box>
    )
}


