import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "../Utils/createServer";
import { MongoMemoryServer } from "mongodb-memory-server";
import DebtModel from "../models/debt.model";
import UserResponseBody from "./TestUtils/UserResponse";

const app = createServer();

const debtApiUrl = "/api/debt";

type DebtResponseBody = {
    type: string,
    name: string,
    description: string, 
    value: number,
    debtor: string,
    creditor?: string,
    _id: string,
    createdAt: Date,
    updatedAt: Date
}

let apiInput = {
    name: "Comida de perro",
    type: "Mascota",
    description: "Comida de marzo para scott",
    value: 2000
}

let incorrectApiInput = {
    name: "Comida de perro",
    type: "Mascota",
    description: "Comida de marzo para scott",
    value: "2000 mil pesos",
    debtor: "",
}

const debtComparison = {
    __v: 0,
    _id: expect.any(String),
    name: expect.any(String),
    type: expect.any(String),
    description: expect.any(String),
    value: expect.any(Number),
    debtor: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),     
}

let userInput = {
    name: "Miguel",
    email: "miguelpccastro@gmail.com",
    phoneNumber: "+54 911 2252-2921",
}

let user : UserResponseBody;

describe("testing debt", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
        user = (await (supertest(app).post("/api/user").send(userInput))).body;
    });

    beforeEach(async () =>{
        await DebtModel.deleteMany({})
    })

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    it("Should create debt", async () => {
        const { statusCode, body } = await supertest(app).post(`${debtApiUrl}/${user._id}`).send(apiInput);
        expect(statusCode).toBe(201);
        expect(body).toEqual(debtComparison);
    })

    it("Should fail creating debt", async () => {
        const { statusCode, body } = await supertest(app).post(`${debtApiUrl}/${user._id}`).send(incorrectApiInput);
        expect(statusCode).toBe(409);
    })

    it("Should find debt based on ID", async () => {
        const debtResponseBody : DebtResponseBody   = (await supertest(app).post(`${debtApiUrl}/${user._id}`).send(apiInput)).body;

        const { statusCode, body } = await supertest(app).get(`${debtApiUrl}/${user._id}?debtId=${debtResponseBody._id}`);
        
        expect(statusCode).toBe(200);
        expect(body).toEqual(debtComparison)
    })

    it("Should find and update debt based on ID", async () => {
        const debtResponseBody : DebtResponseBody   = (await supertest(app).post(`${debtApiUrl}/${user._id}`).send(apiInput)).body;
        await supertest(app).patch(`${debtApiUrl}/${user._id}?debtId=${debtResponseBody._id}`).send({name: "Shampoo"});
        const debtResponseBodyUpdated : DebtResponseBody = ( await supertest(app).get(`${debtApiUrl}/${user._id}?debtId=${debtResponseBody._id}`)).body;

        expect(debtResponseBodyUpdated.name).toBe("Shampoo")
    })

    it("Should delete debt based on ID", async () => {
        const debtResponseBody : DebtResponseBody   = (await supertest(app).post(`${debtApiUrl}/${user._id}`).send(apiInput)).body;
        await supertest(app).delete(`${debtApiUrl}/${user._id}?debtId=${debtResponseBody._id}`);
        const { statusCode }= await supertest(app).get(`${debtApiUrl}/${debtResponseBody._id}`);
        expect(statusCode).toBe(404)
    })
})