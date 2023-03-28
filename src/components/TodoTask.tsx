import React, {FC, ReactComponentElement} from 'react';
import { ITask } from '../Interfaces';

export interface Props{
  task: ITask,
  removeTask: (key:string)=>void,
}

const TodoTask:FC<Props> = ({task, removeTask}: Props) => {
  return (
    <div className='task'>
      <div className='content'>
        <div>Name: {task.taskName}</div>
        <div>Deadline: {task.deadline}</div>
      </div>
      <button onClick={()=>removeTask(task.taskName || "")}>X</button>
    </div>
  );
}

export default TodoTask;