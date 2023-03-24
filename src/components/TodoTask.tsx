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
        <span>Name: {task.taskName}</span>
        <span>Deadline: {task.deadline}</span>
      </div>
      <button onClick={()=>removeTask(task.taskName)}>X</button>
    </div>
  );
}

export default TodoTask;