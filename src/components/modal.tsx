import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import * as React from 'react';
import { TpRootFunctions } from "./interfaces/rootFunctions";

export interface IModalProps {
    visible: boolean,
    title: string,
    children: ({})=>React.ReactElement,
    functionInject: TpRootFunctions,
}

export function Modal ({visible,title,children, functionInject}: IModalProps) {
  return (
    <div>
        
        <CModal visible={visible} onClose={() => functionInject.cancelUserDataChange()}>
        <CModalHeader>

            <CModalTitle>{title}</CModalTitle>

        </CModalHeader>
        <CModalBody>{children(functionInject)}</CModalBody>
        <CModalFooter>

            <CButton onClick={() => functionInject.cancelUserDataChange()} color="secondary">Close</CButton>

            <CButton onClick={() => functionInject.handleOnSave()}  color="primary">Save changes</CButton>

        </CModalFooter>
        </CModal>
      
    </div>
  );
}
