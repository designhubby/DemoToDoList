import React, {FC, useState} from 'react';
import { ITaskInfoAll, taskPriorityLevel, tReactChgEvent, InputFieldName, Scoops } from '../Interfaces';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PrioritySelector } from './PrioritySelector';

export interface ITaskInputFormProps {
    currAllTaskInfo: ITaskInfoAll,
    handleChangeAll: (e: tReactChgEvent) => void,
    addTask: () => void,

}

const TaskInputForm:FC<ITaskInputFormProps> = ({currAllTaskInfo, handleChangeAll,addTask}: ITaskInputFormProps) => {
    
  const [priorityCurrentLvl,setPriorityCurrentLvl ] = useState<taskPriorityLevel>(taskPriorityLevel.Low);
  const abv= priorityCurrentLvl;
  const vcv = currAllTaskInfo.prioritylvl;
  
  return (
    <>
    <div className='inputForm_title'>My Task</div>
    <div className ='inputForm'>
      
      <div className = 'inputContainer'>
        <input name ={InputFieldName.taskName}  type ="text" value={currAllTaskInfo.taskName || ""} onChange={handleChangeAll} placeholder='Task...'/>
        <DatePicker
          selected={currAllTaskInfo.deadline}
          onChange={(date) => handleChangeAll({
            target:{
              name: InputFieldName.deadline,
              value: date,
            }
          })}
          placeholderText="Select a Deadline date" 
          />
          <DatePicker
          selected={currAllTaskInfo.startDate}
          onChange={(date) => handleChangeAll({
            target:{
              name: InputFieldName.startDate,
              value: date,
            }
          })}
          placeholderText="Select a Start date" 
          />
        <PrioritySelector  
          handleChange = {handleChangeAll}
          currentValue = {currAllTaskInfo.prioritylvl}
          name = {InputFieldName.prioritylvl}
          enumVariable ={taskPriorityLevel}/>
      </div>
      <button className='appbtn' onClick={addTask}> Add Task</button>
      </div>
    </>
    
  );
}

export default TaskInputForm;