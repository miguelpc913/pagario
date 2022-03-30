import DeleteUserInput from "../../Inputs/User/IdUserParameter";
import UserModel from "../../Models/user.model";

export async function deleteUser(deleteUserInput: DeleteUserInput["params"]){
    try{
        const user = await UserModel.findByIdAndDelete(deleteUserInput.id);
        if(user === null) throw new Error();
        return user.toJSON();
    }catch(e){
        throw e;
    }
}

