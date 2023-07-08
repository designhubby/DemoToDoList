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