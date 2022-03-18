import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "../Utils/createServer";
import { MongoMemoryServer } from "mongodb-memory-server";
// import DebtModel from "../models/debt.model";

const DebtModel :  any = {}

const app = createServer();

const apiInput = {
    name: "Comida de perro",
    type: "Mascota",
    description: "Comida de marzo para scott",
    value: 2000,
    debtor:DebtModel.Id,
}

const incorrectApiInput = {
    name: "Comida de perro",
    type: "Mascota",
    description: "Comida de marzo para scott",
    value: "2000 mil pesos",
    debtor:DebtModel.id,
}

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

const debtComparison = {
    __v: 0,
    _id: expect.any(String),
    name: expect.any(String),
    description: expect.any(String || null),
    value: expect.any(Number),
    debtor: expect.any(String || null),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),     
}

describe("testing debt", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    beforeEach(async () =>{
        await DebtModel.deleteMany({})
    })

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    it("Should create debt", async () => {
        const { statusCode, body } = await supertest(app).post("/api/debt").send(apiInput);
        expect(statusCode).toBe(201);
        expect(body).toEqual(debtComparison);
    })

    it("Should fail creating debt", async () => {
        const { statusCode, body } = await supertest(app).post("/api/debt").send(incorrectApiInput);
        expect(statusCode).toBe(409);
    })

    it("Should find debt based on ID", async () => {
        const debtResponseBody : DebtResponseBody   = (await supertest(app).post("/api/debt").send(apiInput)).body;
        const { statusCode, body } = await supertest(app).get(`/api/debt/${debtResponseBody._id}`);
        
        expect(statusCode).toBe(200);
        
        expect(body).toEqual(debtComparison)
    })

    it("Should find and update debt based on ID", async () => {
        const debtResponseBody : DebtResponseBody   = (await supertest(app).post("/api/debt").send(apiInput)).body;
        await supertest(app).patch(`/api/debt/${debtResponseBody._id}`).send({name: "Shampoo"});
        const debtResponseBodyUpdated : DebtResponseBody = ( await supertest(app).get(`/api/debt/${debtResponseBody._id}`)).body;

        expect(debtResponseBodyUpdated.name).toBe("Shampoo")
    })

    it("Should delete debt based on ID", async () => {
        const debtResponseBody : DebtResponseBody   = (await supertest(app).post("/api/debt").send(apiInput)).body;
        await supertest(app).delete(`/api/debt/${debtResponseBody._id}`);
        const { statusCode, body }= await supertest(app).get(`/api/debt/${debtResponseBody._id}`);
        expect(statusCode).toBe(404)
    })
})