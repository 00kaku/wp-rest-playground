import axios from 'axios';

const instance = axios.create( {
	baseURL: process.env.REACT_APP_WP_SITE_URL,
} );

export default instance;
