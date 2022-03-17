import { z , TypeOf} from "zod";

const UpdateUserInput = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a string",
        })
    }),
    body: z.object({
        name: z.string({
            invalid_type_error: "Name must be a string",
        }).optional(),
        email: z.string({
            invalid_type_error: "Email must be a string",
        }).min(2 , "Email too short").optional(),
        phoneNumber: z.string({
            invalid_type_error: "phoneNumber must be a string",  
        }).max(40 , "Phone number is too big").min(2 , "Phone number too short").optional()
    })
});
type UpdateUserInput = TypeOf<typeof UpdateUserInput>


export default UpdateUserInput;