import React, {FC, useState} from 'react';
import './App.scss';
import { IDatePickerObj, ITask, ITaskInfoAll, taskPriorityLevel } from './Interfaces';
import TodoTask, {Props} from './components/TodoTask';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCallback } from 'react';
import { PrioritySelector } from './components/PrioritySelector';

type tReactChgEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | IDatePickerObj;
type tHandleChg = (e : tReactChgEvent)=>void;


const App: FC = ()=> {

  const [task,setTask] = useState<string | Date | null>("");
  const [deadline,setDeadline] = useState<number>(0);
  const [todoList,setTodoList] = useState<ITaskInfoAll[]>([]);
  const [priorityCurrentLvl,setPriorityCurrentLvl ] = useState<taskPriorityLevel>(taskPriorityLevel.Low);
  
  const blanktask : ITaskInfoAll = {
    id: Date.now(),
    taskName : null,
    deadline : null,
    startDate :null,
    prioritylvl : taskPriorityLevel.Low,
  }
  const [currAllTaskInfo, setCurrAllTaskInfo] = useState<ITaskInfoAll>( blanktask);
 



  let demoobj : ITaskInfoAll = {
    id: Date.now(),
    taskName : "taskname",
    deadline : 1,
    startDate : new Date(2000,1,1),
    prioritylvl : taskPriorityLevel.High,
  }

  enum InputFieldName{
    id = "id",
    taskName ="taskName",
    deadline = "deadline",
    startDate= "startDate",
    prioritylvl = "prioritylvl",

  }

  const isInputFieldName = (value: string) : value is InputFieldName=>{ // type guard function
    return Object.values(InputFieldName).includes(value as InputFieldName);
  }

  const handleChangeAll = (e : tReactChgEvent)=>{

    if (!isInputFieldName(e.target.name)) { // type guard
      console.warn(`Invalid InputFieldName: ${e.target.name}`);
      return;
    }
    const chgkeyname : InputFieldName = e.target.name as InputFieldName;
    const chgkeyvalue = e.target.value
    let currentTaskInfo: ITaskInfoAll = currAllTaskInfo;

    if(!currentTaskInfo.id){
      
      const id = Date.now();
      currentTaskInfo = Object.assign({...currentTaskInfo}, {id: id});
    };
    const newTask: ITaskInfoAll = Object.assign({...currentTaskInfo}, {[chgkeyname] : chgkeyvalue} );
    setCurrAllTaskInfo(newTask);


  }


  const addTask= () : void =>{
    const newTask :ITaskInfoAll = {
      id: Date.now(),
      taskName : currAllTaskInfo.taskName,
      deadline: currAllTaskInfo.deadline,
      startDate : currAllTaskInfo.startDate,
      prioritylvl : currAllTaskInfo.prioritylvl,
    }
    setTodoList((prev)=>[...prev,newTask ])
    setCurrAllTaskInfo(blanktask);
  }

  const removeTask = (id:number) :void=>{
    const newTodoList = todoList.filter((indiv)=>indiv.id !== id);
    setTodoList(newTodoList);
  }

  const renderToDoList = (): JSX.Element =>(
    <>
    {todoList.map((indiv: ITaskInfoAll, key:number) => <TodoTask key={key} task={indiv} removeTask={removeTask}/>)}
    </>
  )


  return (
    <div className="App">
      <div className='header'>
      
        <div className = 'inputContainer'>
          <input name ={InputFieldName.taskName}  type ="text" value={currAllTaskInfo.taskName || ""} onChange={handleChangeAll} placeholder='Task...'/>
          <input name = {InputFieldName.deadline} type ="number" value={currAllTaskInfo.deadline || ""} onChange={handleChangeAll} placeholder = "Deadline (in Days)..."/>
          <DatePicker
            selected={currAllTaskInfo.startDate}
            onChange={(date) => handleChangeAll({
              target:{
                name: InputFieldName.startDate,
                value: date,
              }
            })}
            />
          <PrioritySelector  
            handleChange = {handleChangeAll}
            currentValue = {priorityCurrentLvl}
            name = {InputFieldName.prioritylvl}
            enumVariable ={taskPriorityLevel}/>

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
