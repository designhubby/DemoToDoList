export interface ITask {
    taskName: string | null,
    deadline: number | null,
}


export enum taskPriorityLevel {
    High = "High", 
    Medium = "Medium",
    Low= "Low"
  }

export interface ITaskInfoAll{
  id: number;
  taskName : string |null;
  deadline : number | null;
  startDate : Date | null;
  prioritylvl : taskPriorityLevel | null
}

export interface IDatePickerObj{
  target:{
    name: string,
  value: Date | null,
  }
}