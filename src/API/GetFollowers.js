import * as Constant from "../Constants";
import axios from "axios";

export async function GetFollowers() {
    try {
        const params = {
        }
        const url = Constant.URL + "get-followers";
        axios.defaults.withCredentials = true;
        const response = (await axios.get(url, {params}));
        console.log(response);
        if (response.data.success) {
            return response.data?.allUsers?.map((user) => user)
        } else {
            console.log('follow failed:', response.data);
            return [];
        }
    } catch (error) {
        console.error('Error during follow:', error);
    }
}