import axios from "axios";

export async function apiPOST(value: object, url: string) {
    await axios.post(url, {
        value
    })
}
