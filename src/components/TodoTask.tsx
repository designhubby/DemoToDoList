import React, {FC, ReactComponentElement} from 'react';

export interface ITodoTaskProps {
    deadline: number,
    todoName: string,
}

const TodoTask:FC<ITodoTaskProps> = ({deadline, todoName}: ITodoTaskProps) => {
  return (
    <div>
      <tr>
        <td>{todoName}</td>
        <td>{deadline}</td>
      </tr>
    </div>
  );
}

export default TodoTask;