import { resolve } from "path"
import { setInterval } from "timers/promises"
import { ITaskInfoAll } from "../Interfaces"

export const GetAllToDoList = async() :Promise<string> =>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const saved = localStorage.getItem("ToDoList");
            saved && resolve(saved)
        },100)
    })
}

export const PostAllToDoList = async(todoData: ITaskInfoAll[]): Promise<void>=>{
    Promise.resolve(
        setTimeout(()=>{
            localStorage.setItem("ToDoList", JSON.stringify(todoData));
        },100)
    )
}