import React , {ChangeEvent, Component , FormEventHandler, MouseEventHandler} from "react";
import {Debt} from  '../../Models/Debt';

type AddDebtItemProps ={
    addDebtItemHandler : Function
}

export class AddDebtItem extends Component<AddDebtItemProps , Debt>{
    listOfInputStrings : String[] = ["name" , "type" , "description"]

    constructor(props : AddDebtItemProps){
        super(props);
        
        this.state = {
            name:"",
            type:"",
            description:"",
            value:0,
            id:0,
            debtor:0,
            creditor:0
        }
    }

    onChangeInputHandler(e : ChangeEvent<HTMLInputElement>) {
        let value = e.currentTarget.value;
        const name  = e.currentTarget.name;
        const numericValue = parseFloat(value)
        if(name === "value"){
            if(!isNaN(numericValue)){
                this.setState({ [name] : numericValue})
            } 
        } if(this.listOfInputStrings.includes(name) && isNaN(numericValue)){
            this.setState(state => ({
                ...state,
                [name]: value,
              }));
        }
    }

    addDebtItem(e : React.MouseEvent<HTMLInputElement>){
        e.preventDefault();
        const debt : Debt = this.state;
        this.props.addDebtItemHandler(debt)
    }

    render() {
        return(
            <form>
                <input type="text" placeholder="Add name" name="name" onChange={this.onChangeInputHandler.bind(this)}/>
                <input type="text" placeholder="Add type" name="type" onChange={this.onChangeInputHandler.bind(this)}/>
                <input type="text" placeholder="Add description" name="description" onChange={this.onChangeInputHandler.bind(this)}/>
                <input type="number" placeholder="Add value" name="value" onChange={this.onChangeInputHandler.bind(this)}/>
                <input type="submit" placeholder="Add debt"
                    name="Add debt" value="Add debt" onClick={this.addDebtItem.bind(this)}/>
            </form>
        )
    }
}