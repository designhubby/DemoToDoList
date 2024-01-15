import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import  React, {ReactElement} from 'react';
import { TpRootFunctions } from "./interfaces/rootFunctions";

export interface IModalProps {
    visible: boolean,
    title: string,
    children: ReactElement[]
    functionInject: TpRootFunctions,
    handleOnClose: ()=>void,
}

export function Modal ({visible,title,children, functionInject, handleOnClose}: IModalProps) {

  const mainComponent = children.find(child => child.props['data-role']=== 'main')
  const footerButtons = children.filter(child=>child.props['data-role']==='footerbutton')
  //const mainComponentCloned = mainComponent && React.cloneElement(mainComponent, {func:functionInject})

  return (
    <div>
        
        <CModal visible={visible} onClose={() => handleOnClose()}>
        <CModalHeader>

            <CModalTitle>{title}</CModalTitle>

        </CModalHeader>
        <CModalBody>{mainComponent && mainComponent}</CModalBody>
        <CModalFooter>
          {footerButtons}

        </CModalFooter>
        </CModal>
      
    </div>
  );
}
