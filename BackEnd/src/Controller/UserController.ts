import { Request, Response } from "express";
import CreateUserInput from "../Inputs/User/CreateUserInput";
import GetUserInput from "../Inputs/User/GetUserInput";
import UpdateUserInput from "../Inputs/User/UpdateUserInput";
import { createUser } from "../Services/User/createUser";
import { getUser } from "../Services/User/getUser";
import { updateUser } from "../Services/User/updateUser";

export const createUserController = async (req: Request<{} , {} , CreateUserInput["body"]>, res: Response) => {
    try {
        const user = await createUser(req.body);
        return res.status(201).send(user);
    } catch (e: any) {
        return res.status(409).send(e.message);
    }
}

export const getUserController = async (req: Request<GetUserInput["params"]>, res: Response) => {
  try {
      const user = await getUser(req.params);
      return res.status(202).send(user);
  } catch (e: any) {
      return res.status(404).send(e.message);
  }
}

export const updateUserController = async (req: Request<UpdateUserInput["params"] , {} , UpdateUserInput["body"]> , res: Response) =>{
    try{
        const user = await updateUser(req.params.id , req.body)
        res.status(202).send(user);
    }catch(e : any){
        res.status(404).send(e.message);
    }
}