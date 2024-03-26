import * as Constant from "../Constants";
import axios from "axios";

export async function Login(username, password) {
    try {
        const params = {
            username: username,
            password: password
        }
        const url = Constant.URL + "sign-in"
        axios.defaults.withCredentials = true;
        const response = (await axios.get(url, {params}));
        if (response.data.success) {
            console.log('Login successful!');
            return true
        } else {
            console.log('Login failed:', response.data);
            return false
        }
    } catch (error) {
        console.error('Error during Login:', error);
    }
}

