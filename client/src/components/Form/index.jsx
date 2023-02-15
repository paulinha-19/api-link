import React from 'react';
import { FormControl, FormGroup, InputLabel, Input, Button, styled, Container } from '@mui/material';

const ContainerStyled = styled(FormGroup)`
    width: 50%;
    margin: 5% auto 0 auto;
    & > div {
        margin-top: 20px;
    }
`

const handleChangeInput = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
}

export const Form = ({title}) => {
    return (
        <Container>
            <Typography variant="h4">{title}</Typography>
            <FormControl>
                <InputLabel htmlFor="input">Url</InputLabel>
                <Input onChange={(e) => handleChangeInput(e)} name='url'  id="input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="input">Titulo</InputLabel>
                <Input onChange={(e) => handleChangeInput(e)} name='title'  id="input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary">Add Link</Button>
            </FormControl>
        </Container>
    )
}
