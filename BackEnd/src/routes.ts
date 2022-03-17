import express , {Express , Request , Response} from 'express';
import {createUserController , getUserController, updateUserController} from './Controller/UserController'
import validateInput from './Utils/validateInput';
import CreateUserInput from './Inputs/User/CreateUserInput';
import GetUserInput from './Inputs/User/GetUserInput';
import UpdateUserInput from './Inputs/User/UpdateUserInput';

function routes(app : Express){
    app.post("/api/user" , validateInput(CreateUserInput) , createUserController)
    app.get("/api/user/:id" , validateInput(GetUserInput) , getUserController)
    app.patch("/api/user/:id" , validateInput(UpdateUserInput) , updateUserController)
}

export default routes;