import React from 'react';
import { Box, Button, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import AppIcon from "./AppIcon";

function HomeScreen() {
   const navigate = useNavigate();
    return (
        <Box>
            <Stack spacing={4} display="flex" padding={8} alignItems="center">
               <AppIcon size={140}/>
            <Typography variant="h5" component="h1">
                welcome to our leading social-media we are not facebook we specialize in selling your data
            </Typography>
                <Button
                    sx={{textTransform: 'inherit'}}
                    variant="contained"
                    onClick={()=>navigate("/Login") }>
                    Login
                </Button>
                <Button
                    sx={{textTransform: 'inherit'}}
                    onClick={()=>navigate("/Register")}
                    variant="outlined">Create Account
                </Button>
            </Stack>
        </Box>
    );
}

export default HomeScreen;