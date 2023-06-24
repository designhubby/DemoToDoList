import { IAuthInput, IAuthOutput, Nullable } from "../components/interfaces/interfaces";



export async function auth({userName, password}: IAuthInput): Promise<Nullable<IAuthOutput>>{
    console.log("auth service");
    console.log(userName + " " + password);
    const userNameCorrect : boolean = userName == "rogers";
    const pwdCorrect: boolean = password == "rogers123";

    const token:IAuthOutput  = {success: true, token: "abcd"};
    const badtoken: IAuthOutput = {success: false, token: ""};

    const correctCred : boolean = userNameCorrect && pwdCorrect ? true : false;
    const result: Promise<IAuthOutput> = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            correctCred ? resolve(token) : resolve(badtoken);
        }, 1000)
    })
    return await result;
}