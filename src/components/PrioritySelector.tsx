import React, {FC, PropsWithChildren} from 'react';


interface IPrioritySelectorProps<T , TEnumValue > {
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>)=>void;
    currentValue: TEnumValue | undefined;
    name: string;
    enumVariable: {[key in keyof T]: TEnumValue}
}
// export enum taskPriorityLevel {
//     High = "High", 
//     Medium = "Medium",
//     Low= "Low"
//   }

export const PrioritySelector = <T,TEnumValue,> ({
    handleChange,
    currentValue,
    name,
    enumVariable,
  }: IPrioritySelectorProps<T , TEnumValue >): JSX.Element | null => {
    
    type prioritylvls = keyof typeof enumVariable
    

    const allPrioritySelectOptions = () =>{
      return (Object.keys(enumVariable) as Array<prioritylvls>).map((indiv, i)=>{
        console.log(indiv);
        return <option key = {i} value = {indiv}>{indiv}</option>
      })
    }
  return (
    <div>
        <select name={name} value = {currentValue} onChange={(e)=>handleChange(e )}>
            {allPrioritySelectOptions()}
        </select>
    </div>
  );

}
