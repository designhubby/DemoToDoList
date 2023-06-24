import { CButton, CDropdownItem } from "@coreui/react";

export enum itemType  {
    Button = "Button",
    TextField = "TextField",
    PasswordField = "PasswordField",
    DropDownItem = "DropDownItem",
    NavLink = "NavLink",

}



export interface INavItems{
    id : string;
    label: string;
    type: itemType;
    form: boolean;
    doSomething?: (index:number)=> JSX.Element;

}
export interface IFormInfo{
    formName: string,
    formData: INavItems[],
    title?: string,
}

export const navItemsGuest: INavItems[] = [
    {
        id: "userid",
        label: "User Name",
        type: itemType.TextField,
        form: true,
    },{
        id: "password",
        label: "Password",
        type: itemType.PasswordField,
        form: true,
    },
    {
        id: "sign_in",
        label: "Sign In",
        type: itemType.Button,
        form: true,
        doSomething: (index:number)=>(
            <CButton key={index} type ="submit" name = "btnSignIn" color ="success" variant="outline">{navItemsGuest[2].label}</CButton>
        ),

    },{
        id: "register",
        label: "Register",
        type: itemType.Button,
        form: true,
        doSomething: (index:number)=>(
            <CButton key={index} type ="submit" name = "btnRegister" color ="success" variant="outline">{navItemsGuest[3].label}</CButton>
        ),
    },
]

export const profileItemsUser: INavItems[] = [
    {
        id: "profile",
        label: "My Profile",
        type: itemType.DropDownItem,
        form: false,
    },{
        id: "signout",
        label: "Sign Out",
        type: itemType.DropDownItem,
        form: false,
    },
]

export const guestForm : IFormInfo = {
    formName : "guestForm",
    formData: navItemsGuest,
}

export const profiledForm : IFormInfo = {
    formName : "signedInForm",
    formData: profileItemsUser,
    title : "My Profile",
}