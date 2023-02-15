import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'

export const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Gerenciar link
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
