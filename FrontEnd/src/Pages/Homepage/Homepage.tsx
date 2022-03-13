import React, { Component } from "react";
import { User } from "../../Models/User";
import {DebtItems} from "./DebtItems/DebtItems"

export function Homepage(user : User){
    return (
        <React.Fragment>
            <h1>Welcome back {user.name}</h1>
            <DebtItems></DebtItems>
        </React.Fragment>
    )
}

