import React, {FC, useEffect, useState} from 'react';
import './App.scss';
import { IDatePickerObj, ITask, ITaskInfoAll, ITaskInfoAllExtended, taskPriorityLevel, tReactChgEvent, InputFieldName } from './Interfaces';

import "react-datepicker/dist/react-datepicker.css";
import { useCallback } from 'react';
import TaskInputForm from './components/TaskInputForm';
import { ToDoList } from './components/ToDoList';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';


const App: FC = ()=> {

  const [todoList,setTodoList] = useState<ITaskInfoAll[]>(()=>{
    const saved = localStorage.getItem("ToDoList");
    let  initialValue:ITaskInfoAll[];
    if(saved){
      initialValue = JSON.parse(saved)
      initialValue.forEach(indiv=>{
        indiv.startDate = indiv.startDate ? new Date(indiv.startDate ) : null;
      })
      return initialValue;
    }
    return []
    
  });
  useEffect(() => {
    // storing input name
    localStorage.setItem("ToDoList", JSON.stringify(todoList));
  }, [todoList]);
  
  
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
  const onDragEnd = (result: DropResult )=>{
    const {source, destination, draggableId} = result;
    console.log("-------------------------------------")
    console.log(`draggableid: ${draggableId}`)
    console.log(`source: ${source}`)
    console.log(`source.droppableId  ${source.droppableId}`)
    console.log(`destination ${destination}`)
    console.log(`destination.droppableId ${destination?.droppableId}`)
    console.log(`destination.index ${destination?.index}`)
    console.log("-------------------------------------")
    
    if(!destination){
        return;
    }
    const newItems = [...todoList]
    const findIndexDraggable = todoList.findIndex(indiv=>indiv.id == parseInt(draggableId))
    const findIndexDroppable = todoList.findIndex(indiv=>indiv.id == destination.index)
    console.log(`findIndexDraggable: ${findIndexDraggable}`);
    console.log(`findIndexDroppable: ${findIndexDroppable}`);
    newItems[findIndexDraggable].prioritylvl = destination?.droppableId as taskPriorityLevel
    const [removed] = newItems.splice(findIndexDraggable, 1);
    newItems.splice(findIndexDroppable, 0, removed);
    setTodoList(newItems);

}

  return (
    <div className="App">
      <div className='header'>
      
        <TaskInputForm currAllTaskInfo={currAllTaskInfo} addTask={addTask} handleChangeAll = {handleChangeAll}/>
        
        
      </div>
      <div className='allLists'>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className = "todoList">
            <ToDoList id={"High"} ToDoListArray={todoList} removeTask={removeTask} setTodoList={setTodoList} filter = {taskPriorityLevel.High}/>
          </div>
          <div className = "todoList">
            <ToDoList id={"Med"} ToDoListArray={todoList} removeTask={removeTask} setTodoList={setTodoList} filter = {taskPriorityLevel.Medium}/>
          </div>
          <div className = "todoList">
            <ToDoList id={"Low"} ToDoListArray={todoList} removeTask={removeTask} setTodoList={setTodoList} filter = {taskPriorityLevel.Low}/>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
