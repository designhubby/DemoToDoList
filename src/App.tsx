import React, {FC, useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import { HairColor, Person } from './components/Person';

import { ITask } from './Interfaces';
import TodoTask from './components/TodoTask';

type tReactChgEvent = React.ChangeEvent<HTMLInputElement>;
type tHandleChg = (e : tReactChgEvent)=>void;


const App: FC = ()=> {

  const [task,setTask] = useState<string>("");
  const [deadline,setDeadline] = useState<number>(0);
  const [todoList,setTodoList] = useState<ITask[]>([]);

  const getName = (name : string)=>{
    return name;
  }


  const handleChange : tHandleChg = (e: tReactChgEvent) :void =>{
    if(e.target.name === "task"){
      setTask(e.target.value);
    }else{
      setDeadline(Number(e.target.value));
    }
  }

  const addTask= () : void =>{
    const newTask :ITask = {
      taskName : task,
      deadline: deadline,
    }
    setTodoList([...todoList,newTask ])
    console.log(todoList)
    setTask("")
    setDeadline(0)
  }

  const renderToDoList = () =>{
    return <>
    {todoList.map(indiv=> <TodoTask todoName={indiv.taskName} deadline={indiv.deadline}/>)}
    </>
  }

  return (
    <div className="App">
      <div className='header'>
      
        <div className = 'inputContainer'>
          <input type ="text" value={task} name ="task" onChange={handleChange} placeholder='Task...'/>
          <input type ="number" value={deadline} onChange={handleChange} placeholder = "Deadline (in Days)..."/>
        </div>
        <button onClick={addTask}> Add Task</button>
      </div>
      <div className = "todoList">
        {renderToDoList()}
      </div>
    </div>
  );
}

export default App;
