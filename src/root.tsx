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

    const authenticateGetToken = async(username: string, password: string) => await auth({userName: username, password: password});

    //useEffect for authen stat
    useEffect(()=>{
        if(token){
            setLoggedin(true);
        }
    },[token])

  return (


    
      <>
        <NavBarTop loggedIn = {loggedin} getToken = {authenticateGetToken}/>
        <App/>
    
      </>
    
    
  );
}

