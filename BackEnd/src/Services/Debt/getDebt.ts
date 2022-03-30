import e from "express";
import GetDebtInput from "../../Inputs/Debt/GetDebtInput";
import DebtModel from "../../Models/debt.model";

const getDebt = async (UserId: String , query : GetDebtInput["query"]) =>{
    try {
        const debts =  await DebtModel.find({debtor : UserId , name: { "$regex": query.name, "$options": "i" } }).lean();
        if(!debts) throw e;
        return debts;
    } catch (e : any) {
        throw e;
    }
}

export default getDebt;