import React, {FC, useEffect, useState} from 'react';
import useCookies from "@js-smart/react-cookie-service";
import { NavBarTop } from './components/navbartop';
import App from './App';
import useToken from './components/hooks/useToken';
import { Modal } from './components/modal';
import { IProfileData, Profile } from './components/profile';
import { GetUserData, PostUserData } from './services/dataUser';
import { LocalGetAllToDoList, LocalPostAllToDoList } from './services/LocalDataToDoList';
import { RemoteGetToDoListData, RemotePostToDoListData } from './services/RemotedataToDoList';
import { EditUser, GetUser, IsLoggedInValid, IsLoginCookie, WebAuthTokenResponse, WebLogin, WebLogOut, WebRegister } from './services/authUser';
import toast, { Toaster } from 'react-hot-toast';
import { ModalSignedOut } from './components/modalSignedout';
import { CButton } from '@coreui/react';
import { IRemoteErrorDetails } from './components/interfaces/interfaces';
import { TpRootFunctions } from './components/interfaces/rootFunctions';
import Joi from 'joi';
import { tlds } from '@hapi/tlds';

const blankProfileData : IProfileData = {
  username : "",
  email: "",
  password:"",
  passwordConfirm: "",
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
    const { check, deleteCookie, deleteAllCookies  } = useCookies();  
  //token hook
    const {token, setToken} = useToken();
    const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [modalShowSignedOutNotice, setModalShowSignedOutNotice] = useState<boolean>(false);
    const [modalShowRegister, setModalShowRegister] = useState<boolean>(false);
    const [errorList, setErrorList] = useState({});

    const getUserData = async ()=>{
      const userData = await GetUser();
      setFormData(userData)
      setFormDataOri(userData);
    }
    const [formData, setFormData] =useState<IProfileData>(blankProfileData);
    const [formDataOri, setFormDataOri] =useState<IProfileData>(blankProfileData);


  const cancelUserDataChange = ()=>{
    setFormData(formDataOri);
    setModalShow(false);
    setModalShowRegister(false);
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
        setToken(tokenResult);
        getUserData();
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
          if(!isLoginTimedOut()){
            console.log(`setModalShow True`)
            setModalShow(true);
          }
          break;
        default:
          break;
      }

      if(id == "signout"){
        signOut();
      }
    }

    const signOut = async (): Promise<void>=>{
      console.log("running Signout")
      WebLogOut()
      deleteCookie('Todo_ExpiryData')
      setToken(null);
    }

    const handleTimedOutSignOut = () =>{
      //if loggedin  is true, but cookie is missing = show: 
      // use another setstate to record last mode?
      
      signOut();
      setModalShowSignedOutNotice(true)
    }
    const isLoginTimedOut = ():boolean=>{
      if(!IsLoggedInValid() && isLoggedin){
        handleTimedOutSignOut();
        console.log(`isLoginTimedOut true`)
        return true
      }else{
        console.log(`isLoginTimedOut false`)
        return false
      }

    }

    const handleOnSave= async(e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>):Promise<void>=>{
      e.preventDefault();
      console.log(`handleonsave`)
      await EditUser(formData);
      setModalShow(false)
    }

    const joiValidationSchema = Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().email({ tlds: { allow: tlds } }).required(),
      password: Joi.string().label('Password')
      .regex(/[ -~]*[a-z][ -~]*/) // at least 1 lowercase
      .regex(/[ -~]*[A-Z][ -~]*/) // at least 1 uppercase
      .regex(/[ -~]*[^0-9a-zA-Z][ -~]*/) // at least 1 special character
      .regex(/[ -~]*[0-9][ -~]*/) // at least 1 number
      .min(4)
      .max(20).required(),
      passwordConfirm : Joi.any().equal(Joi.ref('password')).required().label('Confirm Password').messages({'any.only':'{{#label}} does not match'}),
      firstName: Joi.string().label('First Name').max(20),
      lastName: Joi.string().label('Last Name').max(20),    
    }).options({allowUnknown: true});

    const validationSuccess = ()=>{
      
      const validationResult = joiValidationSchema.validate(formData, {abortEarly: false});
      console.log(`validationResult`)
      console.log(validationResult)
      let _errorList :  null | {}= null;

      if(validationResult.error){
        console.log(`validationResult.error branch`);
        validationResult.error.details.forEach(indivFieldError =>{
          console.log(`indivFieldError`);
          console.log(indivFieldError);
          _errorList ? (_errorList = Object.assign({},{..._errorList}, {[indivFieldError.context?.key ?? 'unknown']: indivFieldError.message}) ) : _errorList = Object.assign({}, {[indivFieldError.context?.key ?? 'unknown']: indivFieldError.message});
        })
        setErrorList(_errorList ?? {});
        return false;
      }else{
        return true;
      }
    }

    const handleOnRegister = async (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>): Promise<void>=>{
      e.preventDefault();
      console.log(`handleOnRegister`);
      const validationResult = validationSuccess();
      if(validationResult){
        try{
          const token = await WebRegister(formData);
          setToken(token);
          //set data source
          //rerender empty 
        }catch(e){
          const error = e as IRemoteErrorDetails;
          console.log(error.data);
          //toast error
          toast.error("Login Failed: " + error.data);
  
        }
      }else{
        console.log(`validationResult`);
        console.log(validationResult); //if fail validation
        const errors = Object.entries(errorList);
        errors.forEach(indiv=>{
          toast.error(`Error: ${indiv[0]}: ${indiv[1]}`);
        })
        
      }

      setModalShowRegister(false);
    }

    const rootFunctions: TpRootFunctions = {
      handleOnSave: handleOnSave,
      handleProfileFieldChange: handleProfileFieldChange,
      getUserData: getUserData,
      cancelUserDataChange: cancelUserDataChange,
      setModalShow: setModalShow,
      setModalShowRegister: setModalShowRegister,
      isLoginTimedOut:isLoginTimedOut,
      isLoggedin:isLoggedin,
    }

    //useEffect for authen stat
    useEffect(()=>{
      
      console.log(`useEffect`)
        if(token != null){
          console.log("setting true")
            setIsLoggedin(true);
        }else{
          console.log("setting false")
          setIsLoggedin(false);
        }
    },[token])

  return (


    
      <>
        <NavBarTop profileData = {formData} loggedIn = {isLoggedin} getToken = {authenticateGetToken} token={token} signOut={signOut} handleOnClick={handleOnClick} functionInject={rootFunctions}/>
        
        <Modal visible = {modalShow} title ="User Profile" functionInject={rootFunctions} handleOnClose = {cancelUserDataChange}>
            <Profile data-role='main'  profileData = {formData} func={rootFunctions} userNameReadOnly = {true}/>
            <CButton data-role='footerbutton' onClick={() => cancelUserDataChange()} color="secondary">Close</CButton>
            <CButton data-role='footerbutton' onClick={(e) => handleOnSave(e)}  color="primary">Save changes</CButton>
        </Modal>
        <Modal visible = {modalShowRegister} title ="Register" functionInject={rootFunctions} handleOnClose = {cancelUserDataChange}>
            <Profile data-role='main'  profileData = {formData} func={rootFunctions} userNameReadOnly = {false}/>
            <CButton data-role='footerbutton' onClick={() => cancelUserDataChange()} color="secondary">Close</CButton>
            <CButton data-role='footerbutton' onClick={(e) => handleOnRegister(e)}  color="primary">Register</CButton>
        </Modal>
        <ModalSignedOut visible = {modalShowSignedOutNotice} title ="Signed Out" setModalShowSignedOutNotice={setModalShowSignedOutNotice} />
        <App dataAccess={token ?RemoteGetToDoListData : LocalGetAllToDoList} dataPost= {token ? RemotePostToDoListData : LocalPostAllToDoList} signOut= {signOut} loggedin={isLoggedin} handleTimedOutSignOut = {handleTimedOutSignOut} functionInject={rootFunctions} forceRerender = {token} />
    
        <Toaster />
      </>
    
    
  );
}

