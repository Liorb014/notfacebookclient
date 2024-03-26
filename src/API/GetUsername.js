import * as Constant from "../Constants";
import axios from "axios";


export async function GetUsername(userId) {
    try {
        const params={
            userId:userId
        }
        const url =Constant.URL + "get-username"
        const response = (await axios.get(url, {params}));
        if (response.data.success) {
const username = response.data?.allUsers.map(user => user.username)
            return  username[0]
        } else {
            console.log('get failed:', response.data);
            return [""]
        }
    } catch (error) {
        console.error('Error during get:', error);
    }
}