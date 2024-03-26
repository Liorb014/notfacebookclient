import * as Constant from "../Constants";
import axios from "axios";

export async function UploadAvatar(text) {
    try {
        const params = {
            text: text
        }
        const url = Constant.URL + "uploadAvatar";
        axios.defaults.withCredentials = true;
        const response = (await axios.get(url, {params}));
        if (response.data.success) {
            console.log('upload successful!');
        } else {
            console.log('upload failed:', response.data);
        }
    } catch (error) {
        console.error('Error during upload:', error);
    }
}