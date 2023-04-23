import React, {FC, ReactComponentElement} from 'react';
import { ITaskInfoAll } from '../Interfaces';

export interface Props{
  task: ITaskInfoAll,
  removeTask: (key:number)=>void,
}
const dateOptions: Intl.DateTimeFormatOptions = {
  weekday : "short",
  year: 'numeric',
  month: 'short',
  day: 'numeric'

}
const TodoTask:FC<Props> = ({task, removeTask}: Props) => {

  //if task.deadline > Date.now() then 
  const styleOverdue = ()=>{
   if(task.deadline) {
      console.log("deadline exists")
      const deadlineDate = new Date(task.deadline);
      const currDate =new Date();
      console.log(`deadlineDate`)
      console.log(deadlineDate)
      console.log(`currDate`)
      console.log(currDate)
      console.log(deadlineDate < currDate)
      if( deadlineDate < currDate){
        return "content-overdue"  
      }
   }
   return ""
  }

  return (
    <div className='task'>
      <div className={`content ${styleOverdue()}`}>
        <div>Name: {task.taskName}</div>
        
        <div>Start: {task.startDate?.toLocaleDateString('en-US',dateOptions) }</div>
        <div>Deadline: {task.deadline?.toLocaleDateString('en-US',dateOptions)}</div>
        <div>Priority: {task.prioritylvl}</div>
      </div>
      <button onClick={()=>removeTask(task.id)}>X</button>
    </div>
  );
}

export default TodoTask;