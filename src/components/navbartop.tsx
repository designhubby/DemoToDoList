import React, {ChangeEvent, ChangeEventHandler, FC, JSXElementConstructor, ReactElement, useEffect, useRef, useState} from 'react';

import { CButton, CCollapse, CContainer, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormInput, CNavbar, CNavbarBrand, CNavbarNav, CNavbarToggler, CNavItem, CNavLink } from '@coreui/react';
import { IFormInfo, guestForm, INavItems, itemType, navItemsGuest, profiledForm, profileItemsUser } from '../rootItems';
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Nullable, IAuthOutput, IRemoteErrorDetails} from './interfaces/interfaces';
import { CNavLinkProps } from '@coreui/react/dist/components/nav/CNavLink';
import Joi from 'joi';
import toast from 'react-hot-toast';
import { TpRootFunctions } from './interfaces/rootFunctions';
import { IsLoggedInValid, WebAuthTokenResponse } from '../services/authUser';
import { IProfileData } from './profile';



export interface INavBarTopProps {
    profileData: IProfileData,
    loggedIn: boolean,
    token: WebAuthTokenResponse | null,
    getToken: (username: string, password: string) => Promise<void>,
    signOut: ()=>void,
    handleOnClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>, id:string)=>void,
    functionInject: TpRootFunctions,
}
export interface INavBarFunctions{
  onFieldChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onSubmit : (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  handleOnClick :  (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>, id:string) => void,
  refBtnSignIn: React.RefObject<HTMLButtonElement>,
}

const joiValidationSchema = Joi.object().keys({
  userid: Joi.string().label('User Id').min(4).max(100).required(),
  password:Joi.string().label('Password').min(4).max(100).required(),

}).options({allowUnknown: true});


export function NavBarTop (props: INavBarTopProps) {
    const [visible, setVisible] = React.useState(false)
    const [errorList, setErrorList] = useState({})

    const [avatarMouseOverActiveClassName, setAvatarMouseOverActiveClassName] = useState('');
    const [avatarIconType, setAvatarIconType] = useState<string>('');
    const [avatarUserName, setAvatarUserName] = useState('');

    const refBtnSignIn = useRef<HTMLButtonElement>(null);
    const [credentials, setCredentials] = useState(
      {
        userid : "",
        password: ""
      });
    const loggedInBootstrapIconClassName = 'bi bi-person-check'
    const loggedOutBootstrapIconClassName = 'bi bi-person-fill-slash'

    const fetchLoginState = async()=>{
      const loginState = props.token;
      if(loginState){
        setAvatarUserName(`Welcome ${props.profileData.username}`);
        setAvatarIconType(loggedInBootstrapIconClassName);
      }else{
        setAvatarUserName(`Guest Mode`);
        setAvatarIconType(loggedOutBootstrapIconClassName);
      }
    }

      useEffect(()=>{

        const handleClickOutside = (event: MouseEvent)=>{
          const navbarbar = document.querySelector('.navbar_whole') as HTMLElement;

          if(navbarbar && !navbarbar.contains(event.target as Node)){
            console.log('Clicked Outside of navbarbar');
            setVisible(false)
          }

        }
        document.addEventListener('click', handleClickOutside);

        fetchLoginState();
        return()=>{
          document.removeEventListener('click', handleClickOutside);
        }

      },[]);
      useEffect(()=>{

        console.log(`fetchLoginState`)
        fetchLoginState();
        
      },[props.token]);
      

    const onFieldChange = (e: ChangeEvent<HTMLInputElement>)=>{
      const {name, value}= e.target;
      console.log(`onFieldChange name: ${name} value: ${value}`);
      setCredentials((prev)=>({...prev, [name] : value}));
    }

    const validationSuccess = (userid: string, password:string)=>{
      const credentials = {userid: userid, password: password};
      const validationResult = joiValidationSchema.validate(credentials, {abortEarly: false});
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

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      
      const target = e.target as typeof e.target &{
        userid? : {value: string},
        password?: { value:string},
        name : {value:string},
      }

      const formname = target.name;
      const userid = target.userid?.value;
      const password = target.password?.value;
      
      console.log(`formname`)
      console.log(formname)

      
      const btn = document.activeElement?.getAttribute("name");
      if(btn == "btnSignIn"){ // fix magic string?

        console.log(e.target)
        if(refBtnSignIn.current){
          refBtnSignIn.current.disabled = true
        }
        if(userid && password){
          //validate fields
          const validationResult = validationSuccess(userid, password)
          if(validationResult){
            //ran vlidation success
            try{
              const data = await props.getToken(userid, password); //if success validation
              fetchLoginState();
            }catch(err){
              const error = err as IRemoteErrorDetails;
              console.log(error.data);
              toast.error("Login Failed: " + error.data);
            }
          }else{
            console.log(validationResult); //if fail validation
            const errors = Object.entries(errorList);
            errors.forEach(indiv=>{
              toast.error(`Error: ${indiv[0]}: ${indiv[1]}`);
            })
            
          }
          
        }else{
          toast.error(`Please fill in user name and password`)
        }
        console.log(btn)
      }

      if(btn == "btnRegister"){ // fix magic string?
        console.log("btnRegister")
        props.functionInject.setModalShowRegister(true);
      }
    }



    const funct :INavBarFunctions = {
      onFieldChange: onFieldChange,
      onSubmit : onSubmit,
      handleOnClick: props.handleOnClick,
      refBtnSignIn : refBtnSignIn,
    }
    const handleOnMouseEnter = async ()=>{
      setAvatarMouseOverActiveClassName('active');
      //check if logged in
      ///true: Show - Network Icon : User Name 
      ///false: Show - Guest Icon : Guest Mode (mouse over modal: description)
      const username = props.profileData.username
      const loggedinCheck = await IsLoggedInValid();
      if(loggedinCheck){
        setAvatarUserName(`Welcome ${username}`);
        setAvatarIconType(loggedInBootstrapIconClassName);

      }else{
        setAvatarUserName(`Guest Mode`);
        setAvatarIconType(loggedOutBootstrapIconClassName);
      }
    }
    const handleOnMouseLeave = ()=>{
      setAvatarMouseOverActiveClassName('');
    }


  return (
    <div>
      <CNavbar expand="lg" colorScheme="light" className="navbar_whole bg-light">
          <CContainer fluid>
            <CNavbarToggler
              aria-label="Toggle navigation"
              aria-expanded={visible}
              onClick={() => setVisible(!visible)}
            />
            <CCollapse className="navbar-collapse" visible={visible}>
            <div className='navbar_iconcontainer'>
              <div className={`navbar_iconcontainer_floating ${avatarMouseOverActiveClassName}`} onMouseEnter={()=>handleOnMouseEnter()} onMouseLeave={()=>handleOnMouseLeave()}>
                <i className={avatarIconType}></i>
                <div className={`navbar_icontext ${avatarMouseOverActiveClassName}`}>{avatarUserName}!</div>
              </div>
            </div>
              <CNavbarBrand href="#">ToDo List</CNavbarBrand>
              <CNavbarNav className="d-flex me-auto mb-2 mb-lg-0">
                <CNavItem>
                  <CNavLink href="#" active>
                    Home
                  </CNavLink>
                </CNavItem>
              </CNavbarNav>
              {NavElementsOutput( props.loggedIn ? profiledForm:  guestForm, funct)}
            </CCollapse>
          </CContainer>
        </CNavbar>
    </div>
  );
}
const NavElementsOutput = (Props: IFormInfo, funct: INavBarFunctions): JSX.Element =>{

    const renderElement = (ItemProp:INavItems, index: number)=>{
        
            if(ItemProp.type == itemType.TextField){
                return <div><CFormInput name={ItemProp.id} onChange={(e)=>funct.onFieldChange(e)} type="text" className='me-2' placeholder={ItemProp.label}key={index}/></div>
            }
            if(ItemProp.type == itemType.Button && ItemProp.doSomething){
                return <div>{ItemProp.doSomething(index, funct)}</div>
            }
            if(ItemProp.type == itemType.PasswordField){
                return <div><CFormInput onChange={(e)=>funct.onFieldChange(e)} type ="password" name={ItemProp.id} placeholder={ItemProp.label}key={index}/></div>
            }
            if(ItemProp.type == itemType.DropDownItem){
                return <CDropdownItem key={index} onClick={(e)=>funct.handleOnClick(e, ItemProp.id)} href="#">{ItemProp.label}</CDropdownItem>
            }
        }

    const renderElementSet = (Props: IFormInfo): JSX.Element[]=>{
        
        const formSet = Props.formData.filter(indiv => indiv.form == true);
        const dropDownSet = Props.formData.filter(indiv=> indiv.type == itemType.DropDownItem && indiv.form == false);
        const navLinkSet = Props.formData.filter(indiv=> indiv.type == itemType.NavLink && indiv.form == false);
        let results: React.ReactElement[] = [];

        if (navLinkSet.length > 0) {
          results.push(
            <>
            {navLinkSet.map((indiv, i) => 
             (<CNavLink key={i} href="#" active>{indiv.label}</CNavLink>)
             )
            }
            </>
          )
        }
        if(dropDownSet.length>0){
            results.push(
                <CDropdown  popper={false}>
                    <CDropdownToggle>{Props.title}</CDropdownToggle>
                    <CDropdownMenu>
                        {dropDownSet.map((indiv, i)=>{
                            return renderElement(indiv, i);
                        })}
                        </CDropdownMenu>
                </CDropdown>)
        }
        if(formSet.length > 0){
            results.push(<CForm className="d-flex input-group w-auto"  name={Props.formName} onSubmit={(e)=>funct.onSubmit(e)}>
                {formSet.map((indiv, i)=>{
                    return renderElement(indiv, i)
                })}
            </CForm>)
        }

        return results
    }
    

    return(
        <>
        {renderElementSet(Props)}
        </>
    )
}