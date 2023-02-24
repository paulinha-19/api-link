import React, { useState } from 'react';
import { CustomModal } from '../Custom/CustomModal';
import { CustomForm } from "../Custom/CustomForm";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton, Box, Button } from '@mui/material';
import { createLink } from '../../services/requests';
import { useQueryClient, useMutation } from 'react-query';
import { showSuccessSubmit, showErrorSubmit } from '../../utils/reactToastify';


export const AddManual = () => {
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
            <Button onClick={handleClickOpen} startIcon={<AddCircleIcon />} title="Adicionar" color="success" variant="contained">
                Adicionar manualmente
            </Button>
            <CustomModal
                isOpen={isOpen}
                handleClose={handleClickClose}
                title="Adicionar link"
            >
                <CustomForm mutation={mutation} onSubmit={handleSubmit} url={formLink.url} title={formLink.title} handleChangeInput={handleChangeInput} titleSubmit="Adicionar" />
            </CustomModal>
            {/* <Button onClick={handleClickOpen} startIcon={<AddCircleIcon />} title="Adicionar" color="success" variant="contained">
                Adicionar automatizado
            </Button>
            <CustomModal
                isOpen={isOpen}
                handleClose={handleClickClose}
                title="Adicionar link"
            >
                <CustomFormAut mutation={mutation} onSubmit={handleSubmit} url={formLink.url} handleChangeInput={handleChangeInput} titleSubmit="Adicionar" />
            </CustomModal> */}
        </Box>
    )
}


