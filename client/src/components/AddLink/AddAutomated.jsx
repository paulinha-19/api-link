import React, { useState } from 'react';
import { CustomModal } from '../Custom/CustomModal';
import { CustomFormAut } from '../Custom/CustomFormAut';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button } from '@mui/material';
import { createLinkAutomated } from '../../services/requests';
import { useQueryClient, useMutation } from 'react-query';
import { showSuccessSubmit, showErrorDeleteAutomated } from '../../utils/reactToastify';


export const AddAutomated = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClickOpen = () => {
        setIsOpen(true);
    };
    const handleClickClose = () => {
        setIsOpen(false);
    };

    const defaultValues = {
        url: "",
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
            onSuccess: () => {
                showSuccessSubmit();
            },
            onError: (error) => {
                const data = error.response.data.data.map(item => {
                    return JSON.stringify({title: item.title, url: item.url})
                })
                showErrorDeleteAutomated(error.response.data.message, data, null, 2);
                mutation.reset();
            },
            onSettled: () => {
                setFormLink("");
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
            <Button sx={{ mt: 2 }} onClick={handleClickOpen} startIcon={<AddCircleIcon />} title="Adicionar" color="success" variant="contained">
                Adicionar automatizado
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


