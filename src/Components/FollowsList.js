import React, {useEffect, useState} from 'react';
import Followers from "./Followers";
import {Stack, Typography} from "@mui/material";
import {GetFollowers} from "../API/GetFollowers";

function FollowsList(props) {

    const [followList, setFollowList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const followersList = await GetFollowers()
            setFollowList(followersList)

        }
        fetchData();

    }, []);
    function renderFollowerList() {

        return followList.map((follower) => {
            return <Followers key={follower.id} name={follower.username}/>
        })
    }

    return (
        <Stack>

            <Typography>Follows list : {followList.length}  follow</Typography>
            {renderFollowerList()}
        </Stack>


    );
}

export default FollowsList;