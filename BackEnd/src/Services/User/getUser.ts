import GetUserInput from "../../Inputs/User/IdUserParameter";
import UserModel from "../../models/user.model";

export async function getUser(UserInput: GetUserInput["params"]){
    try{
        const user = await UserModel.findById(UserInput.id);
        if(user === null) throw new Error();
        return user.toJSON();
    }catch(e){
        throw e;
    }
}

