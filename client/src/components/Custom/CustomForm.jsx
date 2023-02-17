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

export const CustomForm = ({ mutation, onSubmit, url, title, handleChangeInput, titleSubmit, titleLoading }) => {
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
                    inputProps={{ minLength: 2 }}
                    variant='outlined'
                    value={title || ""}
                    onChange={(e) => handleChangeInput(e)}
                />
                <Button sx={{ display: "flex" }} disabled={mutation.isLoading} variant="contained" type='submit' color="primary">
                    {mutation.isLoading ? titleLoading : titleSubmit}
                </Button>
            </form>
        </ContainerStyled>
    )
}
