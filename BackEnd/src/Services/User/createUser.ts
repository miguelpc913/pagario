import UserInput from "../../Inputs/UserInput";
import UserModel from "../../models/user.model";

export async function createFunction(UserInput: UserInput){
    try{
        const user = await UserModel.create(UserInput);
        return user.toJSON();
    }catch(e){
        throw e;
    }
}

