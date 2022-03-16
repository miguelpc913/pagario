import CreateUserInput from "../../Inputs/User/CreateUserInput";
import UserModel from "../../models/user.model";

export async function createUser(UserInput: CreateUserInput["body"]){
    try{
        const user = await UserModel.create(UserInput);
        return user.toJSON();
    }catch(e){
        throw e;
    }
}

