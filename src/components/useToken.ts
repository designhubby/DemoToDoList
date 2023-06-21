import { useState } from 'react';
import { Nullable, IAuthOutput } from './interfaces';

interface iUseToken{
    setToken: (userToken: string | null)=>void;
    token: string | null;
}



export default function useToken(): iUseToken{

    const getToken = (): string | null =>{
        const tokenString  = localStorage.getItem('token');

        const userToken = tokenString ? JSON.parse(tokenString) : null;
        console.log(`userToken`)
        console.log(userToken)
        return userToken
    }
    const [token, setToken] = useState(getToken());

    const saveToken = (userToken: string | null ) =>{
        console.log(`save token: `)
        console.log(userToken)
        localStorage.setItem('token', JSON.stringify(userToken));
        
        setToken(userToken)
    };
    return{
        setToken: saveToken,
        token,
    }
    
}