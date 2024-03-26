import * as Constant from "../Constants";
import axios from "axios";

export async function CreateAccount(username, password,repeat) {
    try {
        const params={
            username:username,
            password:password,
            repeat:repeat
        }
        const url =Constant.URL + "register"


        const response = (await axios.get(url, {params}));

        if (response.data.success) {

           return response.data.success;
        } else {
            console.log(response.data?.errorCode)
            return response.data?.errorCode;
        }
    } catch (error) {
        console.error('Error during Create:', error);
    }
}