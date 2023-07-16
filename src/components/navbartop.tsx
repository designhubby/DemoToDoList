import React, {ChangeEvent, ChangeEventHandler, FC, JSXElementConstructor, ReactElement, useState} from 'react';

import { CButton, CCollapse, CContainer, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormInput, CNavbar, CNavbarBrand, CNavbarNav, CNavbarToggler, CNavItem, CNavLink } from '@coreui/react';
import { IFormInfo, guestForm, INavItems, itemType, navItemsGuest, profiledForm, profileItemsUser } from '../rootItems';
import '@coreui/coreui/dist/css/coreui.min.css'
import { Nullable, IAuthOutput, IRemoteErrorDetails} from './interfaces/interfaces';
import { CNavLinkProps } from '@coreui/react/dist/components/nav/CNavLink';
import Joi from 'joi';
import toast from 'react-hot-toast';
import { TpRootFunctions } from './interfaces/rootFunctions';



export interface INavBarTopProps {
    loggedIn: boolean,
    getToken: (username: string, password: string) => Promise<void>,
    signOut: ()=>void,
    handleOnClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>, id:string)=>void,
    functionInject: TpRootFunctions,
}
interface INavBarFunctions{
  onFieldChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onSubmit : (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  handleOnClick :  (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>, id:string) => void,
}

const joiValidationSchema = Joi.object().keys({
  userid: Joi.string().label('User Id').min(4).max(100).required(),
  password:Joi.string().label('Password').min(4).max(100).required(),

}).options({allowUnknown: true});


export function NavBarTop (props: INavBarTopProps) {
    const [visible, setVisible] = React.useState(false)
    const [errorList, setErrorList] = useState({})

    const [credentials, setCredentials] = useState(
      {
        userid : "",
        password: ""
      });
    
    const showConsole = ()=>{
      console.log("me clicked");
    }

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
        if(userid && password){
          //validate fields
          const validationResult = validationSuccess(userid, password)
          if(validationResult){
            //ran vlidation success
            try{
              const data = await props.getToken(userid, password); //if success validation
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
        props.functionInject.setModalShow(true);
      }
    }



    const funct :INavBarFunctions = {
      onFieldChange: onFieldChange,
      onSubmit : onSubmit,
      handleOnClick: props.handleOnClick,
    }


  return (
    <div>
      <CNavbar expand="lg" colorScheme="light" className="bg-light">
          <CContainer fluid>
            <CNavbarToggler
              aria-label="Toggle navigation"
              aria-expanded={visible}
              onClick={() => setVisible(!visible)}
            />
            <CCollapse className="navbar-collapse" visible={visible}>
              <CNavbarBrand href="#">Hidden brand</CNavbarBrand>
              <CNavbarNav className="me-auto mb-2 mb-lg-0">
                <CNavItem>
                  <CNavLink href="#" active>
                    Home
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="#">Link</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="#" disabled>
                    Disabled
                  </CNavLink>
                </CNavItem>
                {NavElementsOutput( props.loggedIn ? profiledForm:  guestForm, funct)}
              </CNavbarNav>
            </CCollapse>
          </CContainer>
        </CNavbar>
    </div>
  );
}
const NavElementsOutput = (Props: IFormInfo, funct: INavBarFunctions): JSX.Element =>{

    const renderElement = (ItemProp:INavItems, index: number)=>{
        
            if(ItemProp.type == itemType.TextField){
                return <CFormInput name={ItemProp.id} onChange={(e)=>funct.onFieldChange(e)} type="text" className='me-2' placeholder={ItemProp.label}key={index}/>
            }
            if(ItemProp.type == itemType.Button && ItemProp.doSomething){
                return ItemProp.doSomething(index)
            }
            if(ItemProp.type == itemType.PasswordField){
                return <CFormInput onChange={(e)=>funct.onFieldChange(e)} type ="password" name={ItemProp.id} placeholder={ItemProp.label}key={index}/>
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

        if (navLinkSet) {
          results.push(
            <>
            {navLinkSet.map((indiv, i) => 
             (<CNavLink key={i} href="#" active>{indiv.label}</CNavLink>)
             )
            }
            </>
          )
        }
        if(dropDownSet){
            results.push(
                <CDropdown  variant="nav-item" popper={false}>
                    <CDropdownToggle>{Props.title}</CDropdownToggle>
                    <CDropdownMenu>
                        {dropDownSet.map((indiv, i)=>{
                            return renderElement(indiv, i);
                        })}
                        </CDropdownMenu>
                </CDropdown>)
        }
        if(formSet){
            results.push(<CForm  name={Props.formName} onSubmit={(e)=>funct.onSubmit(e)} className="d-flex">
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