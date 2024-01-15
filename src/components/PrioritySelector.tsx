import React, {FC, PropsWithChildren} from 'react';


interface IPrioritySelectorProps<T extends Record<string, string>> {
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>)=>void;
    currentValue: keyof T | null
    name: string;
    enumVariable:  {[K in keyof T as T[K]]: K }
}


export const PrioritySelector = <T extends Record<string, string>,> ({
    handleChange,
    currentValue,
    name,
    enumVariable,
  }: IPrioritySelectorProps<T >): JSX.Element | null => {
    
    const allPrioritySelectOptions = () =>{
      return (Object.keys(enumVariable) ).map((indiv, i)=>{
        return <option key = {i} value = {indiv}>{indiv}</option>
      })
    }
  return (
    <div className='f '>
        <select className='prioritysel ' name={name} value = {currentValue?.toString()} onChange={(e)=>handleChange(e )}>
            {allPrioritySelectOptions()}
        </select>
    </div>
  );

}
