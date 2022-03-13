import React, { ChangeEventHandler, Component } from "react";
import { Debt } from "../../../../Models/Debt";

type debtItemProp = {
    debt : Debt,
    deleteDebtHandler : (id: number) => void,
    debtChangeNameHandler : (newName : string , id: number) => void,
    debtChangeValueHandler: (value : number , id: number) => void
}

export function DebtItem (props : debtItemProp) {

    const deleteDebt = () => {
        props.deleteDebtHandler(props.debt.id)
    }

    const debtChangeNameHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const newName = e.currentTarget.value;
        props.debtChangeNameHandler(newName, props.debt.id)
    }

    const debtChangeValueHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.currentTarget.value);
        if(isNaN(newValue)){

        }else{
            props.debtChangeValueHandler(newValue, props.debt.id)
        }
    }

    return(
            <li data-testid="debt-element">
                <h1>{props.debt.name}</h1>
                <h2>{props.debt.value}</h2>
                <button data-testid="remove-debt" onClick={deleteDebt}>X</button>
                <input type="text" placeholder="edit name"  data-type="name"  onChange={debtChangeNameHandler}/>
                <input type="text" placeholder="edit value" data-type="value" onChange={debtChangeValueHandler}/>
            </li>  
    )      
}
