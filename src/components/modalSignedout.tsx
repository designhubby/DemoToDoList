import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import * as React from 'react';
import { TpRootFunctions } from "./interfaces/rootFunctions";

export interface IModalSignedOutProps {
    visible: boolean,
    title: string,
    setModalShowSignedOutNotice: (value: boolean)=>void
}

export function ModalSignedOut ({visible,title,setModalShowSignedOutNotice}: IModalSignedOutProps) {
  return (
    <div>
        
        <CModal visible={visible} onClose={() => setModalShowSignedOutNotice(false)}>
        <CModalHeader>

            <CModalTitle>{title}</CModalTitle>

        </CModalHeader>
        <CModalBody>You have been signed out, returning to Guest Mode</CModalBody>
        <CModalFooter>

            <CButton onClick={() => setModalShowSignedOutNotice(false)} color="secondary">Close</CButton>

        </CModalFooter>
        </CModal>
      
    </div>
  );
}
