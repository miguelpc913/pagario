import UserInput from "../../Inputs/UserInput";
import UserModel from "../../models/user.model";

export async function createUser(UserInput: UserInput["body"]){
    try{
        const user = await UserModel.create(UserInput);
        return user.toJSON();
    }catch(e){
        throw e;
    }
}

