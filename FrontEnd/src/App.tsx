import React from "react";
import { User } from "./Models/User";
import { Homepage } from "./Pages/Homepage/Homepage";



export function App (){
    const user: User = {
        name: "Miguel",
        age:22,
        gender: "Male",
        id:1,
        phoneNumber: "12323321"
    }
    return(
        <Homepage {...user}></Homepage>
    );
};