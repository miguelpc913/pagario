import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "../Utils/createServer";
import { MongoMemoryServer } from "mongodb-memory-server";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

let apiInput = {
    name: "Miguel",
    email: "miguelpccastro@gmail.com",
    phoneNumber: "+54 911 2252-2921",
    createdAt: new Date("2022-03-14T13:31:07.674Z"),
    updatedAt: new Date("2022-03-14T13:31:07.674Z"),
}

describe( "testing user" , () =>{
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    it("Should create user" , async () =>{
        const { statusCode, body } = await supertest(app)
          .post("/api/user")
          .send(apiInput);
        expect(statusCode).toBe(200);
        expect(body).toBe({
            __v: 0,
            _id: expect.any(String),
            name: expect.any(String),
            email: expect.any(String),
            phoneNumber: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    })
})