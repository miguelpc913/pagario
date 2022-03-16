import { z , TypeOf} from "zod";

const UserGetInput = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a string",
        })
    })
});
type UserGetInput = TypeOf<typeof UserGetInput>


export default UserGetInput;