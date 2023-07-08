export interface ITask {
    taskName: string | null,
    deadline: number | null,
}


export enum taskPriorityLevel {
  High = "High", 
  Medium = "Medium",
  Low= "Low"
}
export enum Scoops {
  ThreeScoop = "ThreeScoop", 
  TwoScoop = "TwoScoop",
  OneScoop= "OneScoop"
}

export interface ITaskInfoAll{
  id: number;
  taskName : string |null;
  deadline : Date | null;
  startDate : Date | null;
  prioritylvl : taskPriorityLevel | null
}

export interface IUserToDoLists{
  applicationUserId:string;
  toDoListData: ITaskInfoAll[];
}

export interface ITaskInfoAllExtended extends ITaskInfoAll{

  extraData: string |null;
}

export interface IDatePickerObj{
  target:{
    name: string,
  value: Date | null,
  }
}

export type tReactChgEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | IDatePickerObj;

export   enum InputFieldName{
  id = "id",
  taskName ="taskName",
  deadline = "deadline",
  startDate= "startDate",
  prioritylvl = "prioritylvl",

}