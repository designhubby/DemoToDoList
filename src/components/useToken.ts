import { useState } from 'react';

interface iUseToken{
    setToken: (userToken: {token:string})=>void;
    token: string | null;
}

export default function useToken(): iUseToken{

    const getToken = ():string | null =>{
        const tokenString  = sessionStorage.getItem('token');

        const userToken = tokenString ? JSON.parse(tokenString) : null;
        return userToken?.token
    }
    const [token, setToken] = useState(getToken());

    const saveToken = (userToken: {token: string}) =>{
        sessionStorage.setItem('token', JSON.stringify(userToken));
        !userToken.token ?? setToken(userToken.token) 
    };
    return{
        setToken: saveToken,
        token,
    }
    
}