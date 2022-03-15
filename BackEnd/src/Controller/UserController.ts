import { Request, Response } from "express";
import UserInput from "../Inputs/UserInput";
import { createUser } from "../service/user.service";

export const createUserController = async (req: Request<{} , {} , UserInput["body"] >, res: Response) => {
    try {
        const user = await createUser(req.body);
        return res.send(user);
    } catch (e: any) {
        return res.status(409).send(e.message);
    }
}
// need to implement user creator service

