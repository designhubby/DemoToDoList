import React, {FC, useEffect, useReducer, useRef, useState} from 'react';
import './App.scss';
import { IDatePickerObj, ITask, ITaskInfoAll, ITaskInfoAllExtended, taskPriorityLevel, tReactChgEvent, InputFieldName, IUserToDoLists } from './Interfaces';
import toast, { Toaster } from 'react-hot-toast';
import "react-datepicker/dist/react-datepicker.css";
import useCookies from "@js-smart/react-cookie-service";
import { useCallback } from 'react';
import TaskInputForm from './components/TaskInputForm';
import { ToDoList } from './components/ToDoList';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { LocalGetAllToDoList, LocalPostAllToDoList } from './services/LocalDataToDoList';
import { IsLoginCookie, WebAuthTokenResponse, WebLogin } from './services/authUser';
import * as _ from "lodash";
import { TpRootFunctions } from './components/interfaces/rootFunctions';

export interface IAppProps {
  dataAccess : ()=>Promise<IUserToDoLists>,
  dataPost: (todoData: ITaskInfoAll[])=>Promise<void>,
  signOut : ()=> void
  forceRerender: WebAuthTokenResponse | null,
  loggedin : boolean,
  handleTimedOutSignOut : ()=>void;
  functionInject: TpRootFunctions;
}
const App: FC<IAppProps> = (props: IAppProps)=> {
    const { getAllCookies, setCookie } = useCookies();

    const [todoList, setTodoList] = useState<ITaskInfoAll[]>([]);
    const [todoListOri, setTodoListOri] = useState<ITaskInfoAll[]>([]);

    const blankToDoListData: ITaskInfoAll[]= []
    useEffect(
      ()=>{
      
        /* console.log(`useeffect count.current`);
        console.log(count.current); */

      (async ()=>{
        const fetchedToDoList =  await props.dataAccess();
        console.log(`props.dataAccess fetchedToDoList`);
        console.log(fetchedToDoList);
        if(fetchedToDoList){
          console.log(`run fetchToDoList TRUETHY branch`)
          let  initialToDoList:ITaskInfoAll[];
          initialToDoList = fetchedToDoList.toDoListData;
          if(initialToDoList.length > 0) {
            initialToDoList.forEach(indiv=>{
              indiv.startDate = indiv.startDate ? new Date(indiv.startDate ) : null;
              indiv.deadline = indiv.deadline ? new Date(indiv.deadline ) : null;
            })}
          
          
          const changes = !_.isEqual(todoList, fetchedToDoList.toDoListData);
          if(changes){

            setTodoList(initialToDoList)
            setTodoListOri(initialToDoList)
          }else{
            console.log(`no changes found`)

          }
        }else{
          console.log("blank profile")
          setTodoList(blankToDoListData);
          setTodoListOri(blankToDoListData);
        }
      })();   
    },[props.forceRerender])

  const runPost = async(data: ITaskInfoAll[])=>{
    await props.dataPost(data);
  }

  useEffect(() => {
    // storing input name
    console.log(`running 2nd useEffect`)
    if(props.functionInject.isLoginTimedOut()){
      console.log(`timed out login`)
      return
    }

   
      const isEqual = _.isEqual(todoList, todoListOri);
      if(!isEqual){
        console.log("running runPost")
        runPost(todoList)
        setTodoListOri(todoList);
      }else{
        
        console.log("not running runPost")
      }
      

    
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
    deadline : new Date(2000,1,1),
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
    //Check isLogin
    if(props.functionInject.isLoginTimedOut()){
      return 
    }
    //// !isLogin = modal ( you are logged out, return to Guest Mode )
    //check if e.target.name = enddate or startdate
    ///if enddate < startdate disregard
    if(currAllTaskInfo.startDate && currAllTaskInfo.deadline ){
      if(currAllTaskInfo.startDate > currAllTaskInfo.deadline){
        toast.error('Start date must be earlier than end date');
        return
      }
    }
    if(!currAllTaskInfo.taskName){
      toast.error('Add in a task name');
      return
    }
    if(currAllTaskInfo.taskName){
      if(currAllTaskInfo.taskName.length>20){
        toast.error('Task Name Max 20 Characters');
        return
      }
    }

    

    

    const newTask :ITaskInfoAll = {
      id: Date.now(),
      taskName : currAllTaskInfo.taskName,
      deadline: currAllTaskInfo.deadline,
      startDate : currAllTaskInfo.startDate,
      prioritylvl : currAllTaskInfo.prioritylvl,
    }
    setTodoList((prev)=>[...prev,newTask ])
    
    setCurrAllTaskInfo(blanktask);
    toast.success('Successfully created!');
  }

  const removeTask = (id:number) :void=>{
    const newTodoList = todoList.filter((indiv)=>indiv.id !== id);
    setTodoList(newTodoList)
    toast.success('Successfully Deleted');
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
const handleOnTestBtn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
  console.log(`testing button`)
  setCookie('token', `sdfsdff`);
setCookie('isLoggedIn', 'true');
  console.log(JSON.stringify(getAllCookies()))

}

  return (
    <div className="App">
      <div className='header'>
        <TaskInputForm currAllTaskInfo={currAllTaskInfo} addTask={addTask} handleChangeAll = {handleChangeAll}/>
        
        
      </div>
      <div className='allLists'>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className = "todoList">
            <div className="todoList-priority">High</div>
            {todoList.length>0 && <ToDoList id={"High"} ToDoListArray={todoList} removeTask={removeTask} setTodoList={setTodoList} filter = {taskPriorityLevel.High}/>}
          </div>
          <div className = "todoList">
            <div className="todoList-priority">Medium</div>
            {todoList.length>0 && <ToDoList id={"Med"} ToDoListArray={todoList} removeTask={removeTask} setTodoList={setTodoList} filter = {taskPriorityLevel.Medium}/>}
          </div>
          <div className = "todoList">
            <div className="todoList-priority">Low</div>
            {todoList.length>0 && <ToDoList id={"Low"} ToDoListArray={todoList} removeTask={removeTask} setTodoList={setTodoList} filter = {taskPriorityLevel.Low}/>}
          </div>
        </DragDropContext>
      </div>
      <div className="devstate">{process.env.NODE_ENV}</div>
    </div>
  );
}

export default App;
