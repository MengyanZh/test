import _axios from 'axios';

const axios = baseUrl => {
    const instance = _axios.create({

        // 全部开发完之后再链接heroku
        baseURL: baseUrl || 'http://localhost:5000'
    });
    return instance;
};

export { axios };

export default axios();