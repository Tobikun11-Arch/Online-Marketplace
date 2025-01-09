import axios from "axios";

//Get token from backend
const authentication = process.env.NEXT_PUBLIC_Authentication; 
export const auth_token = axios.create({
  baseURL: authentication,
  headers: {
    'Content-Type': 'application/json',
  },
});
auth_token.defaults.withCredentials = true;

//Post refresh token, making new token if token expired
const AuthenticationRefresh = process.env.NEXT_PUBLIC_AuthenticationRefresh; 
export const refresh_token = axios.create({
  baseURL: AuthenticationRefresh,
  headers: {
    'Content-Type': 'application/json',
  },
});
refresh_token.defaults.withCredentials = true;

//Post to remove tokens and credentials **it supposed to be put not post**
const SignoutApi = process.env.NEXT_PUBLIC_SIGNOUT; 
export const Signout = axios.create({
  baseURL: SignoutApi,
  headers: {
    'Content-Type': 'application/json',
  },
});
Signout.defaults.withCredentials = true;