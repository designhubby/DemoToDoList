import axios, { AxiosInstance } from "axios";
import { ITaskInfoAll, IUserToDoLists } from "../Interfaces";

const controllerURL= '/ToDoList';

export async function RemoteGetToDoListData(axiosInstance: AxiosInstance = axios):Promise<IUserToDoLists>{
    console.log("Remote GET data")
    return axiosInstance.get(`${controllerURL}`).then(result => result.data);
}

export async function RemotePostToDoListData(todoData: ITaskInfoAll[], axiosInstance: AxiosInstance = axios) : Promise<void>{
    console.log(`remote post something`);
    const dataOut = {
        applicationUserId : " ",
        toDoListData: todoData,
    }
    const postdata = JSON.stringify(dataOut);
    console.log(`dataOut`)
    console.log(dataOut)
    return axiosInstance.post(`${controllerURL}`,postdata).then(result=>result.data);
}