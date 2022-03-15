import express , {Express , Request , Response} from 'express';
import {createUserController} from './Controller/UserController'
import validateInput from './Utils/validateInput';
import UserInput from './Inputs/UserInput';

function routes(app : Express){
    app.post("/api/user" , validateInput(UserInput) , createUserController)
}

export default routes;