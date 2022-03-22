import mongoose from "mongoose";

interface debtDocument {
    type: string,
    name: string,
    description: string, 
    value: number,
    debtor: string,
    creditor?: string,
    createdAt: Date,
    updatedAt: Date
}

const debtSchema = new mongoose.Schema(
    {
        name: {type: String, required:true },
        type: {type: String , required:true},
        description: {type:String},
        value: {type: Number},
        debtor:  {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
        creditor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    },
    {
        timestamps: true
    }
)

const DebtModel = mongoose.model<debtDocument>("Debt" , debtSchema)

export default DebtModel;