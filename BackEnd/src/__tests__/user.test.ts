import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "../Utils/createServer";
import { MongoMemoryServer } from "mongodb-memory-server";
import UserModel from "../models/user.model";
const app = createServer();

const apiInput = {
    name: "Miguel",
    email: "miguelpccastro@gmail.com",
    phoneNumber: "+54 911 2252-2921",
}

const incorrectApiInput = {
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

    beforeEach(async () =>{
        await UserModel.deleteMany({})
    })

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
        const userResponseBody : UserResponseBody   = (await supertest(app).post("/api/user").send(apiInput)).body;
        const { statusCode, body } = await supertest(app).get(`/api/user/${userResponseBody._id}`);
        
        expect(statusCode).toBe(200);
        
        expect(body).toEqual(userComparison)
    })

    it("Should find update user based on ID", async () => {
        const userResponseBody : UserResponseBody   = (await supertest(app).post("/api/user").send(apiInput)).body;
        await supertest(app).patch(`/api/user/${userResponseBody._id}`).send({name: "Angelina"});
        const userResponseBodyUpdated : UserResponseBody = ( await supertest(app).get(`/api/user/${userResponseBody._id}`)).body;

        expect(userResponseBodyUpdated.name).toBe("Angelina")
    })

    it("Should delete user based on ID", async () => {
        const userResponseBody : UserResponseBody   = (await supertest(app).post("/api/user").send(apiInput)).body;
        await supertest(app).delete(`/api/user/${userResponseBody._id}`);
        const { statusCode, body }= await supertest(app).get(`/api/user/${userResponseBody._id}`);
        expect(statusCode).toBe(404)
    })
})