import React, {useEffect, useState} from 'react';
import {Avatar, Box, Card, CardContent, Stack, Typography} from "@mui/material";
import {GetAvatarLink} from "../API/GetAvatarLink";

function Post(props) {
    const [icon, setIcon] = useState("")

    useEffect( () => {
        const fetchData = async () => {
            setIcon(await GetAvatarLink(props.userId))
        }
        fetchData()
    },[]);

    return (
        <Box paddingBottom={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Card elevation={10} sx={{  width: "750px", maxWidth: "100%"}}>
                <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={props.username} src={icon} />
                       <Typography variant="h5" component="h2">{props.username}</Typography>
                    </Stack>
                </CardContent>

                <CardContent>
                    <Typography variant="h5" component="h2">{props.text}</Typography>
                </CardContent>
            </Card>

        </Box>
    );
}

export default Post;