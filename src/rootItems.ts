export enum itemType  {
    Button = "Button",
    TextField = "TextField",
    PasswordField = "PasswordField",
    DropDownItem = "DropDownItem",

}

export interface INavItems{
    id : string;
    label: string;
    type: itemType;

}

export const navItemsGuest: INavItems[] = [
    {
        id: "userid",
        label: "User Name",
        type: itemType.TextField,
    },{
        id: "password",
        label: "Password",
        type: itemType.PasswordField,
    },
    {
        id: "sign_in",
        label: "Sign In",
        type: itemType.Button,

    },{
        id: "register",
        label: "Register",
        type: itemType.Button,
    },
]

export const profileItemsUser: INavItems[] = [
    {
        id: "profile",
        label: "My Profile",
        type: itemType.DropDownItem,
    },{
        id: "signout",
        label: "Sign Out",
        type: itemType.DropDownItem,
    },
]