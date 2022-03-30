import { z , TypeOf} from "zod";

const GetDebtInput = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a string",
        })
    }),
    query: z.object({
        name: z.string({
            invalid_type_error: "Name must be a string",
        }).optional(),
        type: z.string({
            invalid_type_error: "Type must be a string",
        }).optional(),
        description: z.string({
            invalid_type_error: "description must be a string",  
        }).optional(),
        value: z.number({
            invalid_type_error: "value must be a number",  
        }).optional()
    })
});
type GetDebtInput = TypeOf<typeof GetDebtInput>


export default GetDebtInput;