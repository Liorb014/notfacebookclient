import React, {useEffect, useState} from 'react';
import {Avatar, Badge, Box, Button, Stack, TextField, Typography} from "@mui/material";
import * as Utils from "../Utils";
import {useLocation} from "react-router-dom";
import {GetAvatarLink} from "../API/GetAvatarLink";
import {GetPostOfUser} from "../API/GetPostOfUser";
import {GetUsername} from "../API/GetUsername";
import {UploadAvatar} from "../API/UploadAvatar";
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddAlt1SharpIcon from '@mui/icons-material/PersonAddAlt1Sharp';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {ReadCookie} from "../Utils";
import {UploadPost} from "../API/UploadPost";
import {StartFollow} from "../API/StartFollow";
import {Unfollow} from "../API/Unfollow";
import {GetFollowers} from "../API/GetFollowers";
import FollowsList from "./FollowsList";

function ProfilePage(props) {
    const location = useLocation();
    const [userId, setUserID] = useState(location.pathname.split("/")[2]);
    const [name, setName] = useState("");
    const [posts, setPosts] = useState([]);
    const [icon, setIcon] = useState("");
    const [newIconValue, setNewIconValue] = useState("");
    const [follow, setFollow] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [newPostValue, setNewPostValue] = useState("");
    const [newPostVisible, setNewPostVisible] = useState(false);
    const [yourProfile, setYourProfile] = useState(userId === ReadCookie("id"));
    const [followListVisible, setFollowListVisible] = useState(false);



    useEffect(() => {
        setYourProfile(userId === ReadCookie("id"))

        const fetchData = async () => {
            setIcon(await GetAvatarLink(userId));
            setPosts(await GetPostOfUser(userId));
            setName(await GetUsername(userId));
            const followersList = await GetFollowers()
            console.log(followersList +"aa")
           setFollow(followersList.some(user => user.id === parseInt(userId)))
        }

        fetchData();
    }, [userId]);


    useEffect(() => {
        setUserID(location.pathname.split("/")[2]);
    }, [location.pathname]);

    const handleFollow = async () => {
        if (follow) {
            const success = await Unfollow(userId)
            success && setFollow(false);
        } else {
            const success = await StartFollow(userId)
            success && setFollow(true);
        }
    }

    const editIcon = () => (
        <>
            <TextField
                id={"avatar-link"}
                label={"New Icon Path"}
                variant={"outlined"}
                sx={{display: "flex", justifyContent: "center", width: "750px", maxWidth: "100%"}}
                value={newIconValue}
                onChange={(event) => setNewIconValue(event.target.value)}
            />

            <Button
                sx={{textTransform: 'inherit'}}
                variant={"contained"}
                onClick={async () => {
                    await UploadAvatar(newIconValue);
                    setIcon(await GetAvatarLink(userId));
                    setNewIconValue("")
                }}
            >
                Set New Icon
            </Button>
        </>
    );

    return (
        <Box  key={userId} display="flex" justifyContent="end">
            <Stack spacing={4} width={"100%"} direction="column" alignItems="center">
                <Stack spacing={2} display="flex" padding={4} alignItems="center">
                    <Badge
                        overlap="circular"
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        badgeContent={
                            yourProfile &&
                            <Avatar
                                border="2px solid"
                                sx={{bgcolor: "primary.main", border: "2px solid black"}}
                                onClick={() => {setEditVisible(!editVisible);}}
                            >
                                {editVisible ? <EditOffIcon/> : <EditIcon/>}
                            </Avatar>

                        }
                    >
                        <Avatar sx={{width: 150, height: 150}} src={icon}/>
                    </Badge>

                    <Typography variant="h5" component="h2">{name}</Typography>

                    {!yourProfile &&

                        <Button
                            sx={{textTransform: 'inherit'}}
                            size="large"
                            variant={"contained"}
                            onClick={() => {handleFollow()}}
                        >
                            {
                                follow ? <><PersonRemoveIcon/> Unfollow</>
                                    :
                                    <><PersonAddAlt1SharpIcon/>  Follow</>
                            }
                        </Button>
                    }

                </Stack>
                {editVisible && yourProfile && editIcon()}
                {yourProfile &&
                    <Button
                        variant={"contained"}
                        sx={{textTransform: 'inherit'}}
                        onClick={() => {
                            setNewPostVisible(!newPostVisible)
                        }}
                    >
                        {
                            newPostVisible ? <><CommentsDisabledIcon/>Hide New Post</>
                                :
                                <><InsertCommentIcon/>Write New Post</>
                        }
                    </Button>
                }


                {yourProfile && newPostVisible &&
                    <Stack spacing={2} display="flex" alignItems="center">
                        <TextField
                            value={newPostValue}
                            sx={{width: "750px", maxWidth: "100%"}}
                            label="New Post"
                            multiline
                            onChange={(event) => {
                                setNewPostValue(event.target.value)
                            }}
                        />
                        <Button
                            sx={{textTransform: 'inherit'}}
                            variant="contained"
                            onClick={async () => {
                                await UploadPost(newPostValue)
                                setPosts(await GetPostOfUser(userId));
                                setNewPostValue("")
                            }}>
                            Upload Post
                        </Button>

                    </Stack>
                }


                {yourProfile &&
                    <Button
                        variant={"contained"}
                        sx={{textTransform: 'inherit'}}
                        onClick={() => {
                            setFollowListVisible(!followListVisible)
                        }}
                    >
                        {
                            followListVisible ? <><GroupIcon/>Hide Follow List</>
                                :
                                <><GroupIcon/>See Follow List</>
                        }
                    </Button>
                }




                {yourProfile && followListVisible &&
                    <FollowsList />
                }
                <Stack display="flex" alignItems="center">
                    {Utils.renderPosts(posts.toReversed())}
                </Stack>
            </Stack>
        </Box>
    )
        ;
}

export default ProfilePage;
