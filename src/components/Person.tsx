import { type } from '@testing-library/user-event/dist/type';
import { createContext } from 'react';
import {ChangeEvent, FC, useState} from 'react';

export enum HairColor{
    Blonde = "Blonde is your hair",
    Brown = "Brown is so round",
    Red = "Red on your head",
}

interface IPersonProps {
name: string;
age: number;
email?: string;
getName: (name: string)=> string;
haircolour: HairColor;

}

interface IhandleTextchg {
    (key: ChangeEvent<HTMLInputElement>) :void;
}

type Names = "Pedro" | "Jack";
type Country = "Brazil" | "Canada";

enum Namess{
    Pedro,
    Country,
}

interface IContextValue{
    name : string,
    age : number,
    country: Country,

}

const AppContext = createContext<IContextValue | null>(null);

export const Person: FC<IPersonProps> =  ({name, age, email, getName, haircolour})=> {

    const contextValue : IContextValue = {
        name:"Pedro",
        age: 20,
        country : "Brazil",
    }

    const [country, setCountry] = useState<string | number>("")

    const myname : Names = "Jack";

    const myname2 : Namess = Namess.Country;

    const handleTextChg = (e: ChangeEvent<HTMLInputElement>) : void=>{
        const txtval = e.target.value;
        setCountry(txtval);
    }

    const exed : IhandleTextchg = handleTextChg;

  return (
    <AppContext.Provider value = {contextValue}>
    <div>
      <h1>{name}</h1>
      <h2>{getName(name)}</h2>
      <input placeholder = "Write down your country..." value = {country} onChange={exed}/>
        <h2>{haircolour}</h2>
        <h2>{myname2}</h2>
    </div>
    </AppContext.Provider>
  );
}
