import { CRow, CFormLabel, CCol, CFormInput, CInputGroup, CInputGroupText, CModal } from '@coreui/react';
import {useEffect, useState} from 'react';
import '@coreui/coreui/dist/css/coreui.min.css';
import { profiledForm } from './../rootItems';
import { TpRootFunctions } from './interfaces/rootFunctions';

export interface IProfileData {
    username: string,
    email: string,
    password: string,
    passwordConfirm? : string,
    firstName: string,
    lastName: string,

}

export interface IProfileProps{
    func :  TpRootFunctions,
    profileData: IProfileData,
    userNameReadOnly: boolean,
    
}

export function Profile ({ profileData, func, userNameReadOnly}: IProfileProps) {
    const [pwdConfirm, setPwdConfirm] = useState<string>();

    useEffect(()=>{
        console.log(profileData)
        if(func.isLoggedin){
            if(!func.isLoginTimedOut()){
            console.log(`running func.getUserData()`)
            func.getUserData()
        }else{
            console.log(`skipped getUserData`);
        }
        }else{
            console.log(`is not logged in`)
        }

    },[])

  return (
    <div>
        <>
        <CRow className="mb-3">

            <CFormLabel htmlFor="staticUserName" className="col-sm-2 col-form-label" >User Name</CFormLabel>

            <CCol sm={10}>

                <CFormInput type="text" name="username" id="staticUserName" onChange={(e)=>func.handleProfileFieldChange(e)} value={profileData.username}  readOnly={userNameReadOnly} plainText={userNameReadOnly}/>

            </CCol>

        </CRow>
        <CRow className="mb-3">

            <CInputGroup>

                <CInputGroupText>First and last name</CInputGroupText>

                <CFormInput name="firstName" onChange={(e)=>func.handleProfileFieldChange(e)} aria-label="First name" value= {profileData.firstName}/>

                <CFormInput name = "lastName" onChange={(e)=>func.handleProfileFieldChange(e)}  aria-label="Last name" value={profileData.lastName} />

            </CInputGroup>

        </CRow>
        <CRow className="mb-3">

            <CFormLabel htmlFor="inputEmail" className="col-sm-2 col-form-label" >Email</CFormLabel>

            <CCol sm={10}>

                <CFormInput name="email" type="email" id="inputEmail" onChange={(e)=>func.handleProfileFieldChange(e)} value = {profileData.email}/>

            </CCol>

        </CRow>


        <CRow className="mb-3">

            <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</CFormLabel>

            <CCol sm={10}>

                <CFormInput name="password" onChange={(e)=>func.handleProfileFieldChange(e)} type="password" id="inputPassword" value ={profileData.password}/>

            </CCol>
            


        </CRow>
        {!userNameReadOnly && <>
                <CRow className="mb-3">

                    <CFormLabel htmlFor="inputPasswordConfirm" className="col-sm-2 col-form-label">Password</CFormLabel>
                        <CCol sm={10}>
                            <CFormInput name="passwordConfirm" onChange={(e)=>func.handleProfileFieldChange(e)} type="password" id="inputPasswordConfirm" value ={pwdConfirm}/> 
                        </CCol>
                        </CRow>
                </>
                
        }
        </>
    </div>
  );
}
