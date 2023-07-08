import React, {FC, useEffect, useState} from 'react';

import { NavBarTop } from './components/navbartop';
import App from './App';
import useToken from './components/hooks/useToken';
import { Modal } from './components/modal';
import { IProfileData, Profile } from './components/profile';
import { GetUserData, PostUserData } from './services/dataUser';
import { LocalGetAllToDoList, LocalPostAllToDoList } from './services/LocalDataToDoList';
import { RemoteGetToDoListData, RemotePostToDoListData } from './services/RemotedataToDoList';
import { WebLogin } from './services/authUser';


const blankProfileData : IProfileData = {
  userName : "",
  email: "",
  password:"",
  firstName: "",
  lastName: "",
}

//if token exists ? getAxiosSesson : getLocalSession

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
    const [modalShow, setModalShow] = useState<boolean>(false);

    const getUserData = async ()=>{
      const userData = await GetUserData();
      setFormData(userData)
      setFormDataOri(userData);
    }
    const [formData, setFormData] =useState<IProfileData>(blankProfileData);
    const [formDataOri, setFormDataOri] =useState<IProfileData>(blankProfileData);


  const cancelUserDataChange = ()=>{
    setFormData(formDataOri);
    setModalShow(false);
  }

  const handleProfileFieldChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
    const name = e.target.name;
    const value = e.target.value;
    console.log(`name`)
    console.log(name)
    console.log(`value`)
    console.log(value)
    
    setFormData((prev)=>{
      console.log("setFormData prev");
      
        return  {
          ...prev, [name]: value
          }
      
    }
    );
}

    const authenticateGetToken = async(username: string, password: string) => {

      const tokenResult = await WebLogin({email: username, password: password})
      console.log("auth run")
      console.log(username + " " + password);
      console.log(tokenResult.success + " " + tokenResult.token);
      if(tokenResult.success && tokenResult.token){
        console.log("Set Token")
        setToken(tokenResult.token);
      }
    };

    const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>, id:string)=>{
      console.log(`handleOnClick`);
      console.log(`id: ${id}`);
      
      switch(id){
        case "signout":
          signOut();
          break;
        case "profile":
          console.log(`setModalShow True`)
          setModalShow(true);
          break;
        default:
          break;
      }

      if(id == "signout"){
        signOut();
      }
    }

    const signOut = (): void=>{
      console.log("running Signout")
      setToken(null);
    }

    const handleOnSave= async():Promise<void>=>{
      console.log(`handleonsave`)
      await PostUserData(formData);
      setModalShow(false)
    }

    const rootFunctions = {
      handleOnSave: handleOnSave,
      handleProfileFieldChange: handleProfileFieldChange,
      getUserData: getUserData,
      cancelUserDataChange: cancelUserDataChange,
    }

    //useEffect for authen stat
    useEffect(()=>{
      
      console.log(`useEffect`)
        if(token != null){
          console.log("setting true")
            setLoggedin(true);
        }else{
          console.log("setting false")
          setLoggedin(false);
        }
    },[token])
//<Profile {...mockUserProfileData}/>
  return (


    
      <>
        <NavBarTop loggedIn = {loggedin} getToken = {authenticateGetToken} signOut={signOut} handleOnClick={handleOnClick}/>
        <h1>my Token {token}</h1>
        <Modal visible = {modalShow} title ="User Profile" functionInject={rootFunctions}>
          {(functionsInjected)=> <Profile  profileData = {formData} func={rootFunctions} />}
        </Modal>
        <App dataAccess={token ?RemoteGetToDoListData : LocalGetAllToDoList} dataPost= {token ? RemotePostToDoListData : LocalPostAllToDoList} forceRerender = {token} />
    
      </>
    
    
  );
}

