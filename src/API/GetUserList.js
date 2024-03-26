import * as Constant from "../Constants";
import axios from "axios";


export async function GetUserList(username) {
    try {
        const params={
            username:username
        }
        const url =Constant.URL + "usernameList"
        const response = (await axios.get(url, {params}));

        if (response.data.success) {
            return response.data?.allUsers?.map((user) => user )
        } else {
            console.log('get failed:', response.data);
            return [""]
        }
    } catch (error) {
        console.error('Error during get:', error);
    }
}