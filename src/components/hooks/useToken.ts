import { useState } from 'react';
import { Nullable, IAuthOutput } from '../interfaces/interfaces';

interface IUseToken{
    setToken: (userToken: string | null)=>void;
    token: string | null;
}



export default function useToken(): IUseToken{

    const getToken = (): string | null =>{
        const tokenString  = localStorage.getItem('token');
        const userToken = tokenString ? JSON.parse(tokenString, (key,value)=>  value == 'null' ? null : value) : null;
        return userToken
    }
    const [token, setToken] = useState(getToken());

    const saveToken = (userToken: string | null ) =>{

        localStorage.setItem('token', JSON.stringify(userToken));
        
        setToken(userToken)
    };
    return{
        setToken: saveToken,
        token,
    }
    
}