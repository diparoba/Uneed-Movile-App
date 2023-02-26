import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseUrl = 'http://186.4.129.103:8085/api/Login';

export const fetchsinToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`;
  console.log(url);
  if (method === 'GET') {
    return axios.get(url);
  } else {
    return axios.post(url, data);
  }
};

export const fetchconToken = async (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`;

  const token = await AsyncStorage.getItem('token');

  if (method === 'GET') {
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

export const loginByUserAndPassword = async (username, password) => {
  try {
    const resp = await fetchsinToken('auth', { username, password }, 'POST');

    if (resp.status === 200) {
      const body = resp.data;
      console.log(body);
      await AsyncStorage.setItem('token', body.token);

      return body;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const renewToken = async () => {
  try {
    const resp = await fetchconToken('renew', null, 'POST');

    if (resp.status === 200) {
      const body = resp.data;
      console.log(body);
      await AsyncStorage.setItem('token', body.token);

      return body;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};