import axios from 'axios';

const instance = axios.create();

instance.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
})

export default instance