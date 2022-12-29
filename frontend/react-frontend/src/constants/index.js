export const API_BASE_URL = 'http://localhost:8080';
export const API_BASE_URL_DJANGO = 'http://127.0.0.1';
export const ACCESS_TOKEN = 'accessToken';


export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GOOGLE_AUTH_URL_DJANGO = API_BASE_URL_DJANGO + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
