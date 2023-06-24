import React from 'react';


export type TpRootFunctions = {
    handleOnSave: () => void;
    handleProfileFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getUserData: () => Promise<void>;
    cancelUserDataChange: () => void;
};
