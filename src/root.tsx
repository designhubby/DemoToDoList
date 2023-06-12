import React, {FC, useState} from 'react';
import { CButton, CCollapse, CContainer, CForm, CFormInput, CNavbar, CNavbarBrand, CNavbarNav, CNavbarToggler, CNavItem, CNavLink } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'
import { navItemsGuest, INavItems, itemType } from './rootItems';


export interface IRootProps {
}

//Link to
///Modes: Guest - User (registration pwd?)
///Default: Guest
///
export const Root:FC<IRootProps>= (props: IRootProps) =>{
    const [visible, setVisible] = React.useState(false)
  return (


    
      <>
    
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
    
              </CNavbarNav>
    
              <CForm className="d-flex">
    
                <CFormInput type="search" className="me-2" placeholder="Search" />
    
                <CButton type="submit" color="success" variant="outline">
    
                  Search
    
                </CButton>
    
              </CForm>
    
            </CCollapse>
    
          </CContainer>
    
        </CNavbar>
    
      </>
    
    
  );
}

const FormOutput = (Props: INavItems[]): JSX.Element =>{

    const renderElement = (ItemProp:INavItems)=>{
        
            if(ItemProp.type == itemType.TextField){
                return <CFormInput type="text" className='me-2' placeholder={ItemProp.label}/>
            }
            if(ItemProp.type == itemType.Button){
                return <CButton type ="submit" color ="success" variant="outline">{ItemProp.label}</CButton>
            }
            if(ItemProp.type == itemType.PasswordField){
                return <CFormInput type ="password" id={ItemProp.id}
            }
        }
    

    return(
        <>
        {Props.map(indiv=>{
            return renderElement(indiv)
        })}
        </>
    )
}