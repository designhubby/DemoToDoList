import React, {FC, useState} from 'react';

import { CButton, CCollapse, CContainer, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormInput, CNavbar, CNavbarBrand, CNavbarNav, CNavbarToggler, CNavItem, CNavLink } from '@coreui/react';
import { INavItems, itemType, navItemsGuest, profileItemsUser } from '../rootItems';
import '@coreui/coreui/dist/css/coreui.min.css'
import { Nullable, IAuthOutput } from './interfaces';


export interface INavBarTopProps {
    loggedIn: boolean,
    getToken: (username: string, password: string) => Promise<Nullable<IAuthOutput>>
}

export function NavBarTop (props: INavBarTopProps) {
    const [visible, setVisible] = React.useState(false)



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
                {NavElementsOutput( props.loggedIn ? profileItemsUser:  navItemsGuest, props.getToken)}
                {/*<NavElementsOutput  {...props.loggedIn == true ? {...profileItemsUser} : {...navItemsGuest}} />*/}
              </CNavbarNav>
            </CCollapse>
          </CContainer>
        </CNavbar>
    </div>
  );
}
const NavElementsOutput = (Props: INavItems[], run: (username: string, password: string) => Promise<Nullable<IAuthOutput>>): JSX.Element =>{

    const renderElement = (ItemProp:INavItems)=>{
        
            if(ItemProp.type == itemType.TextField){
                return <CFormInput type="text" className='me-2' placeholder={ItemProp.label}/>
            }
            if(ItemProp.type == itemType.Button && ItemProp.doSomething){
                return <CButton type ="button" onClick={ItemProp.doSomething(run)} color ="success" variant="outline">{ItemProp.label}</CButton>
            }
            if(ItemProp.type == itemType.PasswordField){
                return <CFormInput type ="password" id={ItemProp.id} placeholder={ItemProp.label}/>
            }
            if(ItemProp.type == itemType.DropDownItem){
                return <CDropdownItem href="#">{ItemProp.label}</CDropdownItem>
            }
        }

    const renderElementSet = (Props: INavItems[]): JSX.Element[]=>{
        
        const formSet = Props.filter(indiv => indiv.form == true);
        const dropDownSet = Props.filter(indiv=> indiv.type == itemType.DropDownItem && indiv.form == false);
        const navLinkSet = Props.filter(indiv=> indiv.type == itemType.NavLink && indiv.form == false);
        let results: JSX.Element[] = [];

        if(navLinkSet){
            results.push(
                <>
                {navLinkSet.map(indiv => 
                    <CNavLink href="#" active>{indiv.label}</CNavLink>
                    )
                }
                </>
                )
        }
        if(dropDownSet){
            results.push(
                <CDropdown variant="nav-item" popper={false}>
                    <CDropdownToggle>Dropdown link</CDropdownToggle>
                    <CDropdownMenu>
                        {dropDownSet.map(indiv=>{
                            return renderElement(indiv);
                        })}
                        </CDropdownMenu>
                </CDropdown>)
        }
        if(formSet){
            results.push(<CForm className="d-flex">
                {formSet.map(indiv=>{
                    return renderElement(indiv)
                })}
            </CForm>)
        }


        
        const testelearray = [
            <CFormInput type="search" className="me-2" placeholder="Search2" />,<CButton type="submit" color="success" variant="outline">
    
            Search

          </CButton>
        ]
        return results
    }
    

    return(
        <>
        {renderElementSet(Props)}
        </>
    )
}