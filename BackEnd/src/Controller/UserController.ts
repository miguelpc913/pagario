import { Request, Response } from "express";
import CreateUserInput from "../Inputs/User/CreateUserInput";
import GetUserInput from "../Inputs/User/GetUserInput";
import { createUser } from "../Services/User/createUser";
import { getUser } from "../Services/User/getUser";

export const createUserController = async (req: Request<{} , {} , CreateUserInput["body"]>, res: Response) => {
    try {
        const user = await createUser(req.body);
        return res.status(201).send(user);
    } catch (e: any) {
        return res.status(409).send(e.message);
    }
}

export const getUserController = async (req: Request<GetUserInput["params"] , {} , {}>, res: Response) => {
  try {
      const user = await getUser(req.params);
      return res.status(202).send(user);
  } catch (e: any) {
      
      return res.status(404).send(e.message);
  }
}

