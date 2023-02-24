import React, { useState, useEffect } from 'react';
import { TextField, FormGroup, Button, styled } from '@mui/material';
import PropTypes from "prop-types";

const ContainerStyled = styled(FormGroup)`
    max-width: 320px;
    margin: 0 auto;    
`

const FieldStyled = styled(TextField)`
    margin-bottom: 1rem;
`

export const CustomFormAut = ({ onSubmit, url, handleChangeInput, titleSubmit }) => {
    const [disabled, setDisabled] = useState(false);
    useEffect(() => {
        url === "https://devgo.com.br/" || url === "https://devgo.com.br" ? setDisabled(false) : setDisabled(true);
      }, [url]);
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
                <Button sx={{ display: "flex" }} variant="contained" type='submit' color="primary" disabled={disabled}>
                    {titleSubmit}
                </Button>
            </form>
        </ContainerStyled>
    )
}

CustomFormAut.prototype = {
    mutation: PropTypes.elementType,
    onSubmit: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    handleChangeInput: PropTypes.func.isRequired,
    titleSubmit: PropTypes.string.isRequired,
}

