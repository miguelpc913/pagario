import { z , TypeOf} from "zod";

const IdUserParameter = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a string",
        })
    })
});
type IdUserParameter = TypeOf<typeof IdUserParameter>


export default IdUserParameter;