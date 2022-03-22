import UserModel from "../../models/user.model";
import UpdateUserInput from "../../Inputs/User/UpdateUserInput";

export async function updateUser (UserId : UpdateUserInput["params"]["id"] , 
userUpdateInputBody : UpdateUserInput["body"]){
    try{
        const user = await UserModel.findById(UserId);
        if (user === null) throw new Error();
        let key: keyof typeof userUpdateInputBody;
        for (key in userUpdateInputBody) {
            user[key] = userUpdateInputBody[key] as string;
        }
        await user.save();
        return user.toJSON();
    }catch(e){
        throw e;
    }
} 