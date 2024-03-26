import React, {useState} from 'react';
import {Box, Button, Card, Stack, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Login} from "../API/Login";
import {HOME_URL, PROFILE_URL, REGISTER_URL} from "../Constants";
import {ReadCookie} from "../Utils";

function LoginCard(props) {
   const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);

    async function handleLogin() {
        const success = await Login(username, password)
        if(success){
            await props.login()
            navigate(PROFILE_URL+ReadCookie("id"))
        }else{
            setLoginError(true)
        }

    }

    return (
        <Box className="login-card" padding={8} textAlign="center">
            <Card variant='outlined'>
                <Stack
                    spacing={2}
                    padding={2}
                >
                    <Typography
                        variant="h4"
                    >
                        Login
                    </Typography >

                    {loginError&&<Typography color='error'
                        variant="h7"
                    >
                        username or password are incorrect
                    </Typography>}

                    <TextField
                        className="customTextField"
                        error={loginError}
                        variant={"outlined"}
                        type={"text"}
                        label={"Username"}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />

                    <TextField
                        className="customTextField"
                        error={loginError}
                        variant={"outlined"}
                        type={"password"}
                        label={"Password"}
                        value={password}
                        helperText={"Do not share your password with anyone else"}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <Button
                        sx={{textTransform: 'inherit'}}
                        variant='contained'
                        onClick={() => {
                            handleLogin();
                        }}
                    >Login
                    </Button>

                    <Button
                        sx={{textTransform: 'inherit'}}
                        variant='text'
                        onClick={() => {
                           navigate(REGISTER_URL)
                        }}
                    >Create Account
                    </Button>

                </Stack>
            </Card>
        </Box>
    );
}


export default LoginCard;
