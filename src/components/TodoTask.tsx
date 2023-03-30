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
  return (
    <div className='task'>
      <div className='content'>
        <div>Name: {task.taskName}</div>
        
        <div>Start Date: {task.startDate?.toLocaleDateString('en-US',dateOptions)}</div>
        <div>Deadline: {task.deadline}</div>
        <div>Priority: {task.prioritylvl}</div>
      </div>
      <button onClick={()=>removeTask(task.id)}>X</button>
    </div>
  );
}

export default TodoTask;