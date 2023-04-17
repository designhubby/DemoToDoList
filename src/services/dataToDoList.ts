import { resolve } from "path"
import { setInterval } from "timers/promises"
import { ITaskInfoAll } from "../Interfaces"

export const GetAllToDoList = async()=>{
    return new Promise((resolve,reject)=>{
        let s:number = setTimeout(()=>{
            const saved = localStorage.getItem("ToDoList");
            let  initialValue:ITaskInfoAll[];
            resolve(saved)
        },100)
    })
}