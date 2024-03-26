import * as Constant from "../Constants";
import axios from "axios";

export async function GetAvatarLink(id) {
            try {
                const params = {id: id}
                const url = Constant.URL + "get-avatar"
                const response = await axios.get(url, {params})
                    .then(response => response.data.string)
                    .catch(error => Promise.reject(error))
                return response
            } catch (error) {
                console.error('Error during get:', error);
            }
        }
