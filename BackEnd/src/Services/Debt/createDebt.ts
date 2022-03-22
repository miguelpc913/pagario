import CreateDebtInput from "../../Inputs/Debt/CreateDebtInput";
import IdUserParameter from "../../Inputs/User/IdUserParameter";
import DebtModel from "../../models/debt.model";
import UserModel from "../../models/user.model";

export const createDebt = async (debt :  CreateDebtInput["body"] , userId : IdUserParameter["params"]["id"]) =>{
    try{
        const user = await UserModel.findById(userId);
        if(user === null) throw new Error();
        debt.debtor = userId;
        const newDebt = await DebtModel.create(debt);
        return newDebt;
    }catch(e : any){
        throw e;
    }
}