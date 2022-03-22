import {Request, Response} from 'express';
import CreateDebtInput from '../Inputs/Debt/CreateDebtInput';
import { createDebt } from '../Services/Debt/createDebt';

export const CreateDebtController = async ( 
    req: Request<CreateDebtInput["params"] , {} , CreateDebtInput["body"]> , 
    res : Response) =>{
        try{
            const debt = await createDebt(req.body , req.params.id);
            res.status(201).send(debt);
        }catch(e : any){
            res.status(409).send(e.message);
        }
}