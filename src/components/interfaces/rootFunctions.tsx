import React from 'react';


export type TpRootFunctions = {
    handleOnSave: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => void;
    handleProfileFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getUserData: () => Promise<void>;
    cancelUserDataChange: () => void;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
    setModalShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
    isLoginTimedOut: ()=>boolean;
    isLoggedin: boolean;
};
