import React, { useState } from 'react';
import { TextField, FormControl, FormGroup, InputLabel, Input, Button, styled, Container, Typography } from '@mui/material';
import { useMutation } from 'react-query';

const ContainerStyled = styled(FormGroup)`
    max-width: 320px;
    margin: 0 auto;    
`

const FieldStyled = styled(TextField)`
    margin-bottom: 1rem;
`

export const CustomForm = ({ mutation, onSubmit, url, title, handleChangeInput }) => {
    return (
        <ContainerStyled>
            <form onSubmit={onSubmit}>
                <FieldStyled
                    required
                    autoFocus
                    margin="dense"
                    id="url"
                    htmlFor="url"
                    label="Url"
                    name='url'
                    type="text"
                    variant='outlined'
                    value={url || ""}
                    onChange={(e) => handleChangeInput(e)}
                />
                <FieldStyled
                    required
                    autoFocus
                    margin="dense"
                    id="titulo"
                    htmlFor="titulo"
                    label="Titulo"
                    name='title'
                    type="text"
                    variant='outlined'
                    value={title || ""}
                    onChange={(e) => handleChangeInput(e)}
                />
                <Button disabled={mutation.isLoading} variant="contained" type='submit' color="primary">
                    {mutation.isLoading ? "Criando os dados" : "Add link"}
                </Button>
            </form>
        </ContainerStyled>
    )
}
