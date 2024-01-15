import { rejects } from "assert";
import { IProfileData } from "../components/profile";

let mockUserProfileData : IProfileData = {
    username : "username123",
    email: "username123@rogers.ca",
    password:"pwdusername123",
    firstName: "firstName123",
    lastName: "lastName123",
  }
  
export async function GetUserData(): Promise<IProfileData>{


    const result = new Promise<IProfileData>((resolve, reject)=>{
        setTimeout(()=>{
            resolve(mockUserProfileData)
        },1000)
    })

    return result;
}

export async function PostUserData(data: IProfileData):Promise<void>{
    
    Promise.resolve(
        setTimeout(()=>{
            console.log(`start settimeout`)
            mockUserProfileData.email = data.email;
            mockUserProfileData.password= data.password;
            mockUserProfileData.firstName = data.firstName;
            mockUserProfileData.lastName = data.lastName;
        },1000)
    )



}