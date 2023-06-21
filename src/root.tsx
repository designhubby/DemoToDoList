import React, {FC, useEffect, useState} from 'react';
import { CButton, CCollapse, CContainer, CDropdown, CForm, CFormInput, CNavbar, CNavbarBrand, CNavbarNav, CNavbarToggler, CNavItem, CNavLink } from '@coreui/react';

import { navItemsGuest, INavItems, itemType, profileItemsUser } from './rootItems';
import { render } from '@testing-library/react';
import { NavBarTop } from './components/navbartop';
import App from './App';
import useToken from './components/useToken';
import { auth } from './services/auth';


export interface IRootProps {
}

//Link to
///Modes: Guest - User (registration pwd?)
///Default: Guest
///
export const Root:FC<IRootProps>= (props: IRootProps) =>{
    //token hook
    const {token, setToken} = useToken();
    const [loggedin, setLoggedin] = useState<boolean>(false);

    const authenticateGetToken = async(username: string, password: string) => {

      const tokenResult = await auth({userName: username, password: password})
      console.log("auth run")
      console.log(username + " " + password);
      console.log(tokenResult.success + " " + tokenResult.token);
      if(tokenResult.success && tokenResult.token){
        console.log("Set Token")
        setToken(tokenResult.token);
      }
    };
    const signOut = (): void=>{
      console.log("running Signout")
      setToken(null);
    }

    //useEffect for authen stat
    useEffect(()=>{
      
      console.log(`useEffect`)
        if(token){
          console.log("setting true")
            setLoggedin(true);
        }else{
          console.log("setting false")
          setLoggedin(false);
        }
    },[token])

  return (


    
      <>
        <NavBarTop loggedIn = {loggedin} getToken = {authenticateGetToken} signOut={signOut}/>
        <App/>
    
      </>
    
    
  );
}

