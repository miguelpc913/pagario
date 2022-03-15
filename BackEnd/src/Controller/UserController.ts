import { Request, Response } from "express";
import UserInput from "../Inputs/UserInput";
import { createUser } from "../Services/User/createUser";

export const createUserController = async (req: Request<{} , {} , UserInput["body"]>, res: Response) => {
    try {
        const user = await createUser(req.body);
        return res.status(200).send(user);
    } catch (e: any) {
        return res.status(409).send(e.message);
    }
}

