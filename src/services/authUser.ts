import useCookies from "@js-smart/react-cookie-service";
import axios, { AxiosInstance } from "axios";

const controllerURL= '/AuthManagement';

export interface IWebUserLoginDto{
    email: string,
    password: string,
}

export async function WebLogin(webuserLoginDto: IWebUserLoginDto, axiosInstance :AxiosInstance = axios) {
    const results = await axiosInstance.post(`${controllerURL}/Login`, webuserLoginDto).then(response=> response.data);
    console.log(`return from Auth`);
    console.log(results);
    return results;
  }

export function IsLoginCookie(){
    const { check } = useCookies();
    console.log(`checking islogin`)
    if(check('Todo_ExpiryData')){
        console.log('checking cookie islogin: true')
        return true;
    }
    console.log('checking cookie islogin: false')
    return false;
}

export async function WebLogOut( axiosInstance :AxiosInstance = axios){
    const results = await axiosInstance.post(`${controllerURL}/Logout`).then(response=> response.data);
    console.log(`return from Auth`);
    console.log(results);
    return results;
}