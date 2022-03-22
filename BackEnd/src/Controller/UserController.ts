import { Request, Response } from "express";
import CreateUserInput from "../Inputs/User/CreateUserInput";
import IdUserParameter from "../Inputs/User/IdUserParameter";
import UpdateUserInput from "../Inputs/User/UpdateUserInput";
import { createUser } from "../Services/User/createUser";
import { getUser } from "../Services/User/getUser";
import { updateUser } from "../Services/User/updateUser";
import { deleteUser } from "../Services/User/deleteUser";

export const createUserController = async (
    req: Request<{} , {} , CreateUserInput["body"]>, 
    res: Response) => {
    try {
        const user = await createUser(req.body);
        return res.status(201).send(user);
    } catch (e: any) {
        return res.status(409).send(e.message);
    }
}

export const getUserController = async (
    req: Request<IdUserParameter["params"]>, 
    res: Response) => {
  try {
      const user = await getUser(req.params);
      return res.status(200).send(user);
  } catch (e: any) {
      return res.status(404).send(e.message);
  }
}

export const updateUserController = async (
    req: Request<UpdateUserInput["params"] , {} , UpdateUserInput["body"]> , 
    res: Response) =>{
    try{
        const user = await updateUser(req.params.id , req.body)
        res.status(200).send(user);
    }catch(e : any){
        res.status(404).send(e.message);
    }
}

export const deleteUserController = async (
    req: Request<IdUserParameter["params"]>, 
    res: Response) => {
    try {
        const user = await deleteUser(req.params);
        return res.status(200).send(user);
    } catch (e: any) {
        return res.status(404).send(e.message);
    }
  }