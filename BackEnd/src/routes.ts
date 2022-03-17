import express , {Express , Request , Response} from 'express';
import {createUserController , deleteUserController, getUserController, updateUserController} from './Controller/UserController'
import validateInput from './Utils/validateInput';
import CreateUserInput from './Inputs/User/CreateUserInput';
import IdUserParameter from './Inputs/User/IdUserParameter';
import UpdateUserInput from './Inputs/User/UpdateUserInput';

function routes(app : Express){
    app.post("/api/user" , validateInput(CreateUserInput) , createUserController)
    app.get("/api/user/:id" , validateInput(IdUserParameter) , getUserController)
    app.delete("/api/user/:id" , validateInput(IdUserParameter) , deleteUserController)
    app.patch("/api/user/:id" , validateInput(UpdateUserInput) , updateUserController)
}

export default routes;