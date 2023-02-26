import { fetchsinToken, fetchconToken } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginByUserAndPassword = async (username, password) => {
    try {
        const resp = await fetchsinToken('auth', { username, password }, 'POST');
        //console.log(resp);
        console.log(resp.data.token);

        if (resp.status === 200) {
            const body = { token: resp.data.token };
            console.log(body);
            await AsyncStorage.setItem('token', body.token);
            return body;

        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}
export const renewToken = async () => {

    const resp = await fetchconToken('Renew', null, 'POST');

    if (resp.ok) {
        if (resp.status === 200) {
            const body = await resp.json();
            //console.log(body);
            await AsyncStorage.setItem('token', body.token);
            return body;
        } else {
            return null;
        }
    } else {
        console.log(resp.status);
    }
}
