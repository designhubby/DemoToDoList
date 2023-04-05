import React, {FC, useState} from 'react';
import { ITaskInfoAll, taskPriorityLevel, tReactChgEvent, InputFieldName } from '../Interfaces';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PrioritySelector } from './PrioritySelector';

export interface ITaskInputFormProps {
    currAllTaskInfo: ITaskInfoAll,
    handleChangeAll: (e: tReactChgEvent) => void,

}

const TaskInputForm:FC<ITaskInputFormProps> = ({currAllTaskInfo, handleChangeAll}: ITaskInputFormProps) => {
    
  const [priorityCurrentLvl,setPriorityCurrentLvl ] = useState<taskPriorityLevel>(taskPriorityLevel.Low);
  const abv= priorityCurrentLvl;
  const vcv = currAllTaskInfo.prioritylvl;
  
  return (
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
      currentValue = {currAllTaskInfo.prioritylvl}
      name = {InputFieldName.prioritylvl}
      enumVariable ={taskPriorityLevel}/>

  </div>
  );
}

export default TaskInputForm;