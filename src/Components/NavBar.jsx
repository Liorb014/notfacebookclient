import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Autocomplete, Box, Button, Stack, TextField} from "@mui/material";
import AppIcon from "./AppIcon";
import LogoutIcon from '@mui/icons-material/Logout';
import FeedIcon from '@mui/icons-material/Feed';
import PersonIcon from '@mui/icons-material/Person';
import {GetUserList} from "../API/GetUserList";
import {useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {HOME_URL, PROFILE_URL} from "../Constants";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';


function NavBar(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [usernameOptions, setUsernameOptions] = useState([]);


    async function autocompleteHandler(newValue) {
        setSearch(newValue)
        let temp = await GetUserList(newValue);
        temp = temp.filter(user => {
            return user.id != props.id
        })
        setUsernameOptions(temp)
    }

    function searchHandle() {
        const ids = usernameOptions.filter(element => element.username.includes(search));
        if (ids.length >= 1) {
            navigate(PROFILE_URL + ids[0].id)
        }
        setSearch("")
        setUsernameOptions([])
    }

    const handleLogout = async () => {
        await props.logout();
        navigate(HOME_URL);
    };

    return (
        <Stack spacing={10}>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                        <Stack direction="row" spacing={2} alignItems="center">

                            <AppIcon size={50}/>

                            <Typography variant="h6" component="div">
                                Not Facebook
                            </Typography>

                        </Stack>

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Autocomplete
                                variant="filled"
                                onInputChange={(event, newValue) => {autocompleteHandler(newValue)}}
                                value={search}
                                sx={{width: 400}}
                                freeSolo
                                getOptionLabel={(option) => option.toString()}
                                options={usernameOptions.map(user => user.username)}
                                renderInput={(params) => (
                                    <TextField
                                        sx={{backgroundColor: 'white'}} {...props}
                                        InputLabelProps={{style: {color: 'black'},}} {...params}
                                        variant="filled"
                                        label="Search user"
                                        InputProps={{
                                            ...params.InputProps,
                                            style: {color: 'black'},
                                        }}
                                        InputLabelProps={{
                                            style: {color: 'black'},
                                        }}
                                    />
                                )}
                            />

                            <Button sx={{textTransform: 'inherit'}}
                                    color="inherit"
                                    onClick={() => {
                                        searchHandle()
                                    }
                                    }
                            >
                                <PersonSearchIcon/>
                                Search
                            </Button>
                        </Stack>

                        <Stack direction="row" spacing={4}>
                            <Button
                                sx={{
                                    textTransform: 'inherit',
                                    color: location.pathname === HOME_URL ? "secondary.light" : "inherit"
                                }}
                                onClick={() => {
                                    navigate(HOME_URL)
                                }}
                            >
                                <FeedIcon/>
                                Home Feed
                            </Button>

                            <Button sx={{
                                textTransform: 'inherit',
                                color: location.pathname === PROFILE_URL + props.id ? "secondary.light" : "inherit"
                            }}
                                    onClick={() => {navigate(PROFILE_URL + props.id)}}
                            >
                                <PersonIcon/>
                                Your Profile
                            </Button>

                            <Button sx={{textTransform: 'inherit'}}
                                    color="inherit"
                                    onClick={() => {handleLogout()}}
                            >
                                <LogoutIcon/>
                                Log Out
                            </Button>
                        </Stack>
                    </Box>
                </Toolbar>
            </AppBar>
            <Outlet/>
        </Stack>
    );
}

export default NavBar;
