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
      const deadlineDate = new Date(task.deadline);
      const currDate =new Date();

      if( deadlineDate < currDate){
        return "content-overdue"  
      }
   }
   return ""
  }

  return (
    <div className='task'>
      <div className={`container content ${styleOverdue()}`}>
        <div className='row'>
          <div className='col task_title'>{task.taskName}</div>
        </div>
        <div className='row'>
          <div className='col'>Start:</div>
          <div className='col'>Due Date:</div>
          <div className='col'>Priority</div>
        </div>
        <div className='row'>
          <div className='col'>{task.startDate?.toLocaleDateString('en-US',dateOptions) }</div>
          <div className='col'>{task.deadline?.toLocaleDateString('en-US',dateOptions)}</div>
          <div className='col'>{task.prioritylvl}</div>
        </div>
      </div>
      <button className='appbtn' onClick={()=>removeTask(task.id)}>X</button>
    </div>
  );
}

export default TodoTask;