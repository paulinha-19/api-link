import React from 'react';
import { TextField, FormGroup, Button, styled } from '@mui/material';
import PropTypes from "prop-types";

const ContainerStyled = styled(FormGroup)`
    max-width: 320px;
    margin: 0 auto;    
`

const FieldStyled = styled(TextField)`
    margin-bottom: 1rem;
`

export const CustomForm = ({ onSubmit, url, title, handleChangeInput, titleSubmit }) => {
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
                    helperText="Formatos: https://xx.com, http://xx.com ou www.xx.com"
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
                <Button sx={{ display: "flex" }} variant="contained" type='submit' color="primary">
                    {titleSubmit}
                </Button>
            </form>
        </ContainerStyled>
    )
}

CustomForm.prototype = {
    mutation: PropTypes.elementType,
    onSubmit: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    handleChangeInput: PropTypes.func.isRequired,
    titleSubmit: PropTypes.string.isRequired,
}

