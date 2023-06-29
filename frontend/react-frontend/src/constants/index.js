export const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
export const FRONTEND_BASE_URL = process.env.REACT_APP_FRONTEND_URL;
export const ACCESS_TOKEN = 'accessToken'



export const OAUTH2_REDIRECT_URI = FRONTEND_BASE_URL + '/oauth2/redirect'
export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GOOGLE_AUTH_URL_DJANGO = API_BASE_URL + '/api/oauth2/login/google';
