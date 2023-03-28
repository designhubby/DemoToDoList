import React, {FC} from 'react';

interface IPrioritySelectorProps<T extends string, TEnumValue extends string> {
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>)=>void;
    currentValue: TEnumValue | undefined;
    name: string;
    enumVariable: {[key in T]: TEnumValue}
}
// export enum taskPriorityLevel {
//     High = "High", 
//     Medium = "Medium",
//     Low= "Low"
//   }

export const PrioritySelector: FC<IPrioritySelectorProps<string, string>> = ({
    handleChange,
    currentValue,
    name,
    enumVariable,
  }): JSX.Element => {
    
    type prioritylvls = keyof typeof enumVariable
    

    const allPrioritySelectOptions = () =>{
      return (Object.keys(enumVariable) as Array<prioritylvls>).map((indiv)=>{
        console.log(indiv);
        return <option value = {indiv}>{indiv}</option>
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
