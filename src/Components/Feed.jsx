import React, {useEffect, useState} from 'react';
import {Box, Stack} from "@mui/material";
import * as Utils from "../Utils";
import {GetPostOfUser} from "../API/GetFeed";
import {ReadCookie} from "../Utils";

function Feed(props) {
    const [posts, setPosts] = useState([])

    useEffect( () => {
        const fetchData = async () => {
          setPosts(await GetPostOfUser(ReadCookie("id")))
        }
        fetchData()
    },[]);

    return (
        <Box>
            <Stack spacing={2} display="flex" alignItems="center">
                {Utils.renderPosts(posts)}
            </Stack>
        </Box>
    );
}

export default Feed;