import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const validateInput = (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            })
            next();
        } catch (e) {
            res.status(409).json(e);
        }
    }


export default validateInput;