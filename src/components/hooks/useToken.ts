import { useState } from 'react';
import { WebAuthTokenResponse } from '../../services/authUser';
import { Nullable, IAuthOutput } from '../interfaces/interfaces';

interface IUseToken{
    setToken: (userToken: WebAuthTokenResponse | null)=>void;
    token: WebAuthTokenResponse | null;
}



export default function useToken(): IUseToken{

    const getToken = (): WebAuthTokenResponse | null =>{
        const tokenString  = localStorage.getItem('token');
        const userToken = tokenString ? JSON.parse(tokenString, (key,value)=>  value == 'null' ? null : value) : null;
        return userToken
    }
    const [token, setToken] = useState<WebAuthTokenResponse |null>(getToken());

    const saveToken = (userToken: WebAuthTokenResponse | null ) =>{

        localStorage.setItem('token', JSON.stringify(userToken));
        
        setToken(userToken)
    };
    return{
        setToken: saveToken,
        token,
    }
    
}