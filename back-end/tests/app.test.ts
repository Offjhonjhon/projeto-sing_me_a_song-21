import { faker } from "@faker-js/faker";
import supertest from "supertest";

import app from "./../src/app.js";
import { prisma } from "./../src/database.js";

import { recommendationFactory, deleteAllData } from "./factories/recomendationFactory.js";
beforeEach(async () => {
    await deleteAllData();
})

const agent = supertest(app);

describe("recommendation tests", () => {

    it("should create a recommendation", async () => {
        const recommendation = await recommendationFactory();
        recommendation.youtubeLink = "https://www.youtube.com/watch?v=pDbcC-xSat4"

        const result = await agent.post("/recommendations").send(recommendation)

        const recommendationCreated = await prisma.recommendation.findFirst({
            where: {
                name: recommendation.name
            }
        });

        expect(result.status).toBe(201);
        expect(recommendationCreated).toBeDefined();
    });

    it("should return a error because the link is not from you tube", async () => {
        const recommendation = await recommendationFactory();

        const result = await agent.post("/recommendations").send(recommendation)

        expect(result.status).toBe(400);
    })





})