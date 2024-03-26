import React from 'react';
import {CardMedia} from "@mui/material";

function AppIcon(props) {
    return (
        <CardMedia
            image={require("../Assets/NoFacebookIcon.webp")}
            sx={{ height: props.size , width: props.size }}
        />
    );
}

export default AppIcon;