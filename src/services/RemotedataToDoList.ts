import axios, { AxiosInstance } from "axios";
import { ITaskInfoAll, IUserToDoLists } from "../Interfaces";

const controllerURL= '/ToDoList';

export async function RemoteGetToDoListData(axiosInstance: AxiosInstance = axios):Promise<IUserToDoLists>{
    return axiosInstance.get(`${controllerURL}`).then(result => result.data);
}

export async function RemotePostToDoListData(todoData: ITaskInfoAll[]) : Promise<void>{
    console.log(`fake post something`);
}