export type Debt = {
    type: string,
    name: string,
    description: string, 
    value: number,
    debtor: number,
    creditor?: number,
    id: number
}