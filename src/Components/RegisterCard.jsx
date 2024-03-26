import React, {useEffect, useState} from 'react';
import {Box, Button, Card, Stack, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {CreateAccount} from "../API/CreateAccount";
import * as Constant from "../Constants";

function RegisterCard() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [repeatError, setRepeatError] = useState(false);
    const [error, setError] = useState("");


    const regex = /^[a-zA-Z0-9]{4,30}$/;

    useEffect(() => {
        if (username.length >= 1) {
            setUsernameError(!regex.test(username))
        }
    }, [username]);


    useEffect(() => {
        if (password.length >= 1) {
            setPasswordError(!regex.test(password))
        }
    }, [password]);

    useEffect(() => {
       setRepeatError(repeat !== password && repeat.length > 0)
    }, [password,repeat]);


    async function createAccount() {
         CreateAccount(username, password, repeat).then(result => {
             if (result===Constant.ERROR_CODE_MISSING_USERNAME){
                 setError(Constant.MISSING_USERNAME_ERROR)
             }else if(result===Constant.ERROR_CODE_MISSING_PASSWORD){
                 setError(Constant.MISSING_PASSWORD_ERROR)
             }else if(result===Constant.ERROR_CODE_PASSWORD_UNMATCHED){
                 setError(Constant.PASSWORD_UNMATCHED_ERROR)
             }else if(result===Constant.ERROR_CODE_USERNAME_TAKEN){
                 setError(Constant.USERNAME_TAKEN_ERROR)
             }else if(result===Constant.ERROR_CODE_USERNAME_OUT_OF_THE_REQUIREMENTS){
                 setError(Constant.USERNAME_OUT_OF_THE_REQUIREMENTS_ERROR)
             }else if(result===Constant.ERROR_CODE_PASSWORD_OUT_OF_THE_REQUIREMENTS){
                 setError(Constant.PASSWORD_OUT_OF_THE_REQUIREMENTS_ERROR)
             }
         });
    }

    return (
        <Box className="login-card" padding={8} textAlign="center">
            <Card variant={"outlined"}>
                <Stack
                    spacing={2}
                    padding={2}
                >
                    <Typography
                        variant="h4">
                        Create Account
                    </Typography>
                    <Typography
                        variant="h7"
                        color="error"
                    >
                        {error}
                    </Typography>
                    <TextField
                        error={usernameError}
                        className="customTextField"
                        variant={"outlined"}
                        type={"text"}
                        helperText={Constant.TEXT_FIELD_REQUIREMENTS}
                        label={"Username"}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <TextField
                        error={passwordError}
                        helperText={Constant.TEXT_FIELD_REQUIREMENTS}
                        className="customTextField"
                        variant={"outlined"}
                        type={"password"}
                        label={"Password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <TextField
                        error={repeatError}
                        helperText={repeatError ? Constant.MISSING_PASSWORD_ERROR : ""}
                        className="customTextField"
                        variant={"outlined"}
                        type={"password"}
                        label={"Repeat Password"}
                        value={repeat}
                        onChange={(event) => setRepeat(event.target.value)}
                    />

                    <Button
                        sx={{textTransform: 'inherit'}}
                        variant={"contained"}
                        onClick={() => createAccount()}
                    >Create Account</Button>

                    <Button
                        sx={{textTransform: 'inherit'}}
                        variant={"text"}
                        onClick={() => {
                            navigate("/Login")
                        }}
                    >Login </Button>

                </Stack>
            </Card>
        </Box>
    );
}


export default RegisterCard;
