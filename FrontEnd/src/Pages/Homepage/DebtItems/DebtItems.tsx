import React , {Component, FormEventHandler} from "react";
import { AddDebtItem } from "../../../Components/AddDebtItem/AddDebtItem";
import { Debt } from "../../../Models/Debt";
import { DebtItem } from "./DebtItem/DebtItem";

interface DebtItemsState {
    debts: Debt[]
}

interface debtItemsProps {}

export class DebtItems extends Component<debtItemsProps , DebtItemsState>{

    deleteDebtHandler (id: number){
        this.setState((state) =>({debts : state.debts.filter( debt => debt.id !== id)}))
    }

    debtChangeNameHandler (newName : string, id : number){
        const newDebts = this.state.debts.map( debt =>{
            if(debt.id === id) debt.name = newName;
            return debt
        })
        this.setState({debts : newDebts})
    }

    debtChangeValueHandler (newValue : number, id : number){
        const newDebts = this.state.debts.map( debt =>{
            if(debt.id === id) debt.value = newValue;
            return debt
        })
        this.setState({debts : newDebts})
    }

    addDebtItemHandler (debt :Debt){
        this.setState( (state , props) =>{
            return {
                debts : [...state.debts , debt]
            }
        })
    }

    constructor(props : debtItemsProps){
        super(props);
        this.state = {
            debts : [
                {name: "test1" , type:"onlytest" , description:"test" , value:1 , debtor:1, id:1 },
                {name: "test2" , type:"onlytest" , description:"test" , value:2 , debtor:1, id:2 },
                {name: "test3" , type:"onlytest" , description:"test" , value:3 , debtor:1, id:3 }
            ],
        }
    }

    render(){
        return(
        <React.Fragment>
                <div>
                    <AddDebtItem addDebtItemHandler={this.addDebtItemHandler.bind(this)}></AddDebtItem>
                    <ul>
                        {
                            this.state.debts.map(debt =>
                                <DebtItem debt={debt} key={debt.id}
                                    deleteDebtHandler={this.deleteDebtHandler.bind(this)}
                                    debtChangeNameHandler={this.debtChangeNameHandler.bind(this)}
                                    debtChangeValueHandler={this.debtChangeValueHandler.bind(this)}></DebtItem>
                            )}
                    </ul>
        </div>
        </React.Fragment>
        )
    }
}

