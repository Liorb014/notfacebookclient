import * as Constant from "../Constants";
import axios from "axios";

export async function Unfollow(id) {
    try {
        const params = {
            id: id
        }
        const url = Constant.URL + "unFollow";
        axios.defaults.withCredentials = true;
        const response = (await axios.get(url, {params}));
        console.log(response);
        if (response.data.success) {
            console.log('follow successful!');
            return true;
        } else {
            console.log('follow failed:', response.data);
            return false;
        }
    } catch (error) {
        console.error('Error during follow:', error);
    }
}