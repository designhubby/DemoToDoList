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
    doSomething?: (data: object)=> any;

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
        doSomething: (run :object)=>run 

    },{
        id: "register",
        label: "Register",
        type: itemType.Button,
        form: true,
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