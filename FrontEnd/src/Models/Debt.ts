export type Debt = {
    type: string,
    name: string,
    description: string, 
    value: number,
    debtor: string,
    creditor?: string,
    _id: string,
    createdAt: Date,
    updatedAt: Date
}