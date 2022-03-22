import { z , TypeOf} from "zod";

const CreateDebtInput = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a string",
        })
    }),
    body: z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }),
        type: z.string({
            required_error: "Type is required",
            invalid_type_error: "Type must be a string",
        }).min(2 , "Email too short"),
        description: z.string({
            required_error: "description is required",
            invalid_type_error: "description must be a string",  
        }).max(100 , "description is too big").min(10 , "description too short"),
        value: z.number({
            required_error: "value is required",
            invalid_type_error: "value must be a number",  
        }),
        debtor: z.string({
            invalid_type_error:"Debtor should be a valid string"
        }).optional(),
        creditor: z.string({
            required_error: "Debtor is required",
            invalid_type_error:"Debtor should be a valid string"
        }).optional()


    })
});

type CreateDebtInput = TypeOf<typeof CreateDebtInput>

export default CreateDebtInput;