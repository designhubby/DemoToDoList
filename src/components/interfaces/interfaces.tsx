export interface IAuthInput{
    userName: string,
    password: string,
}
export interface IAuthOutput{
    success: boolean
    token : string,
    
}
export type Nullable<T> ={
    [P in keyof T] : T[P] | null
}

export interface IRemoteErrorDetails extends Error{
    data: any;
}