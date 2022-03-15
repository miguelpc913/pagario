import { z , TypeOf} from "zod";

const UserInput = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }),
        email: z.string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        }),
        phoneNumber: z.string({
            required_error: "phoneNumber is required",
            invalid_type_error: "phoneNumber must be a string",  
        }).max(40 , "Phone number is too big")
    })
});
type UserInput = TypeOf<typeof UserInput>


export default UserInput;