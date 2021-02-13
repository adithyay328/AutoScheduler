import axios from 'axios';

const login = (email, password) => {
    return axios({
        method: 'POST',
        url: 'apiurlhere',
        data: {
            email: email,
            password: password,
        }
    }).then((resp) => resp.data);
};
export default login;
