import axios from 'axios';

const instance = axios.create ({
	baseURL : "http://localhost:10013/wp-json/wc/v1/",
});

export default instance;
