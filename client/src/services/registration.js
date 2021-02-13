import axios from 'axios';

const registration = (username, email, password) => {
    return axios({
        method: 'POST',
        url: 'apiurlhere',
        data: {
            username: username,
            email: email,
            password: password,
        }
    }).then((resp) => resp.data);
};
export default registration;

