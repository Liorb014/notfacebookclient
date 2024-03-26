import React from "react";
import {Stack, Typography} from "@mui/material";

function Followers(props) {
    return (
                <Stack  direction="row" spacing={2}>
                    <Typography>
                        {props.name}
                    </Typography>
                </Stack>
    );

}
export default Followers;