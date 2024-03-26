

import * as Constant from "../Constants";
import axios from "axios";

export async function UploadPost(text) {
    try {
        const params = {
            text: text
        }
        const url = Constant.URL + "upload-post";
        axios.defaults.withCredentials = true;
        const response = (await axios.get(url, {params}));
        console.log(response);
        if (response.data.success) {

            console.log('Create successful!');
        } else {
            console.log('Create failed:', response.data);
        }
    } catch (error) {
        console.error('Error during Create:', error);
    }
}