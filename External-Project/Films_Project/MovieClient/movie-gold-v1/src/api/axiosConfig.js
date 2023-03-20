import axios from 'axios';

export default axios.create({
    baseURL: 'https://ad78-5-89-203-244.eu.ngrok.io',
    headers: {"ngrok-skip-browser-warning": "true"}
});