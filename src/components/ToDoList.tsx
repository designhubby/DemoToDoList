import * as React from 'react';
//import {  Draggable, DraggableLocation,Droppable,DropResult  } from 'react-beautiful-dnd';
import { DragDropContext, Draggable, DraggableLocation,Droppable,DropResult } from '@hello-pangea/dnd';
import { isTemplateExpression } from 'typescript';
import { IDatePickerObj, ITask, ITaskInfoAll, taskPriorityLevel, tReactChgEvent, InputFieldName } from '../Interfaces';
import TodoTask, {Props} from './TodoTask';


export interface IToDoListProps<T extends ITaskInfoAll> {
    id: string,
    ToDoListArray : T[],
    removeTask: (id:number) =>void,
    setTodoList: React.Dispatch<React.SetStateAction<ITaskInfoAll[]>>,
    filter: T["prioritylvl"] extends infer R ? R : never, 

}

export const ToDoList = <T extends ITaskInfoAll,>({id, ToDoListArray, removeTask, setTodoList, filter}: IToDoListProps<T>): JSX.Element => {


  return (
    <>
    
        <Droppable droppableId = {(filter as string).toString()}>

            {(provided, snapshot)=>(

                <div 
                    { ...provided.droppableProps}
                    className="Droppable"
                    ref={provided.innerRef}>

                    {ToDoListArray.filter((indiv)=>indiv.prioritylvl== filter).map((indiv: T, key:number) => (

                        <Draggable  key={indiv.id} draggableId={indiv.id.toString()} index={indiv.id}>
                            
                            {(provided, snapshot)=>(
                                <div 
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className = "draggable">
                                    <TodoTask key={key} task={indiv} removeTask={removeTask}/>
                                </div>

                            )}
                        </Draggable>
                    
                    ))}

                    {provided.placeholder}
                </div>
            )}

        </Droppable>


    </>
  );
}
