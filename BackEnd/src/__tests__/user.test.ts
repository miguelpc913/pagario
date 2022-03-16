import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "../Utils/createServer";
import { MongoMemoryServer } from "mongodb-memory-server";
import { UserDocument } from "../models/user.model";
import { STATUS_CODES } from "http";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

let apiInput = {
    name: "Miguel",
    email: "miguelpccastro@gmail.com",
    phoneNumber: "+54 911 2252-2921",
}


let apiInput2 = {
    name: "Miguel",
    email: "miguelpccastros@gmail.com",
    phoneNumber: "+54 911 2252-2921",
}

let incorrectApiInput = {
    name: "Miguel",
    email: "miguelpccastro@gmail.com",
}

interface UserResponseBody {
    name: String,
    email: String
    phoneNumber?: String,
    createdAt: String,
    updatedAt: String,
    _id: String,
    _v: Number
}

const userComparison = {
    __v: 0,
    _id: expect.any(String),
    name: expect.any(String),
    email: expect.any(String),
    phoneNumber: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),   
}

describe("testing user", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    it("Should create user", async () => {
        const { statusCode, body } = await supertest(app).post("/api/user").send(apiInput);
        expect(statusCode).toBe(201);
        expect(body).toEqual(userComparison);
    })

    it("Should fail creating user", async () => {
        const { statusCode, body } = await supertest(app).post("/api/user").send(incorrectApiInput);
        expect(statusCode).toBe(409);
    })

    it("Should find user based on ID", async () => {
        const userResponseBody : UserResponseBody   = (await supertest(app).post("/api/user").send(apiInput2)).body;
        const {statusCode, body} = await supertest(app).get(`/api/user/${userResponseBody._id}`);
        
        expect(statusCode).toBe(202);
        
        expect(body).toEqual(userComparison)
    })
})