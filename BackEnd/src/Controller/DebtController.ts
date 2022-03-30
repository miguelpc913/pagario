import {Request, Response} from 'express';
import CreateDebtInput from '../Inputs/Debt/CreateDebtInput';
import GetDebtInput from '../Inputs/Debt/GetDebtInput';
import createDebt from '../Services/Debt/createDebt';
import getDebt from '../Services/Debt/getDebt';

export const createDebtController = async ( 
    req : Request<CreateDebtInput["params"] , {} , CreateDebtInput["body"]> , 
    res : Response) =>{
        try{
            const debt = await createDebt(req.body , req.params.id);
            res.status(201).send(debt);
        }catch(e : any){
            res.status(409).send(e.message);
        }
}

export const getDebtController = async (
    req: Request<GetDebtInput["params"] , {} , {} , GetDebtInput["query"]>,
    res: Response
    ) =>{
        try{
            const debt = await getDebt(req.params.id , req.query);
            res.status(202).send(debt);
        }catch(e: any){
            res.status(404).send(e.message)
        }
}