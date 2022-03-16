import express , {Express , Request , Response} from 'express';
import {createUserController , getUserController} from './Controller/UserController'
import validateInput from './Utils/validateInput';
import CreateUserInput from './Inputs/User/CreateUserInput';
import GetUserInput from './Inputs/User/GetUserInput';

function routes(app : Express){
    app.post("/api/user" , validateInput(CreateUserInput) , createUserController)
    app.get("/api/user/:id" , validateInput(GetUserInput) , getUserController)
}

export default routes;