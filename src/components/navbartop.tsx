import React, {ChangeEvent, ChangeEventHandler, FC, JSXElementConstructor, ReactElement, useState} from 'react';

import { CButton, CCollapse, CContainer, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormInput, CNavbar, CNavbarBrand, CNavbarNav, CNavbarToggler, CNavItem, CNavLink } from '@coreui/react';
import { formInfo, guestForm, INavItems, itemType, navItemsGuest, profiledForm, profileItemsUser } from '../rootItems';
import '@coreui/coreui/dist/css/coreui.min.css'
import { Nullable, IAuthOutput } from './interfaces';
import { CNavLinkProps } from '@coreui/react/dist/components/nav/CNavLink';


export interface INavBarTopProps {
    loggedIn: boolean,
    getToken: (username: string, password: string) => Promise<void>,
    signOut: ()=>void,
}
interface iFunct{
  onFieldChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onSubmit : (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  handleOnClick :  (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => void,
}

export function NavBarTop (props: INavBarTopProps) {
    const [visible, setVisible] = React.useState(false)
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
      if(btn == "btnSignIn"){
        console.log(e.target)
        if(userid && password){
          await props.getToken(userid, password);
        }
        console.log(btn)
      }
    }
    const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>)=>{
      console.log(`handleOnClick`);
      props.signOut();
    }


    const funct :iFunct = {
      "onFieldChange": onFieldChange,
      "onSubmit" : onSubmit,
      "handleOnClick": handleOnClick,
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
                {/*<NavElementsOutput  {...props.loggedIn == true ? {...profileItemsUser} : {...navItemsGuest}} />*/}
              </CNavbarNav>
            </CCollapse>
          </CContainer>
        </CNavbar>
    </div>
  );
}
const NavElementsOutput = (Props: formInfo, funct: iFunct): JSX.Element =>{

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
                return <CDropdownItem key={index} onClick={(e)=>funct.handleOnClick(e)} href="#">{ItemProp.label}</CDropdownItem>
            }
        }

    const renderElementSet = (Props: formInfo): JSX.Element[]=>{
        
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
                    <CDropdownToggle>Dropdown link</CDropdownToggle>
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