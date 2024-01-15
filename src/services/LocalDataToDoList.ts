import { resolve } from "path"
import { setInterval } from "timers/promises"
import { ITaskInfoAll, IUserToDoLists } from "../Interfaces"

export const LocalGetAllToDoList = async() :Promise<IUserToDoLists> =>{
    let localtasks : Promise<IUserToDoLists> = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const saved : ITaskInfoAll[]= localStorage.getItem("ToDoList") ? JSON.parse(localStorage.getItem("ToDoList")?? "") : "";
            const localdata = {
                applicationUserId : 'guest',
                toDoListData : saved,
            }
            localdata && resolve(localdata)
        },100)
    })


    return localtasks
}

export const LocalPostAllToDoList = async(todoData: ITaskInfoAll[]): Promise<void>=>{
    Promise.resolve(
        setTimeout(()=>{
            localStorage.setItem("ToDoList", JSON.stringify(todoData));
        },100)
    )
}