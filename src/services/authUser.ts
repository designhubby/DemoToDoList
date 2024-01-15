import useCookies from "@js-smart/react-cookie-service";
import axios, { AxiosInstance } from "axios";
import { IProfileData } from "../components/profile";

const controllerURL= '/AuthManagement';

export interface IWebUserLoginDto{
    email: string,
    password: string,
}

export interface WebAuthTokenResponse{
    success: boolean,
    token: string,
    expiry: Date,
    errors?: [],
}

export async function WebLogin(webuserLoginDto: IWebUserLoginDto, axiosInstance :AxiosInstance = axios):Promise<WebAuthTokenResponse> {
    const results = await axiosInstance.post(`${controllerURL}/Login`, webuserLoginDto, {
        //AxiosRequestConfig parameter
        withCredentials: true //correct
      }).then(response=> response.data);
    console.log(`return from WebLogin`);
    console.log(results);
    return results;
  }

  export async function IsLoggedInValid(axiosInstance :AxiosInstance = axios): Promise<boolean>{
    const results = await axiosInstance.post(`${controllerURL}/AuthenticationStatus`).then(response => response.data);
    console.log(`IsLoggedInValid`)
    console.log(results)
    return results;
  }

export function IsLoginCookie(){ //no longer in use due to CORS issues with cookies
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
    console.log(`return from WebLogOut`);
    console.log(results);
    return results;
}

export async function WebRegister( profileData: IProfileData, axiosInstance : AxiosInstance = axios, ){
    const results = await axiosInstance.post(`${controllerURL}/Register`, profileData).then(response => response.data);
    console.log(`return from WebRegister`);
    console.log(results);
    return results;
}

export async function GetUser(axiosInstance : AxiosInstance = axios){
    const results = await axiosInstance.get(`${controllerURL}/GetUser`).then(response => response.data);
    console.log(`return from GetUser`);
    console.log(results);
    return results;
}

export async function EditUser(profileData: IProfileData, axiosInstance: AxiosInstance = axios): Promise<IProfileData>{
    const result = await axiosInstance.post(`${controllerURL}/EditUser`, profileData).then(response=>response.data);
    return result;
}