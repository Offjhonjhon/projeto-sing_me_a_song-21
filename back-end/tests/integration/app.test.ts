import { faker } from "@faker-js/faker";
import supertest from "supertest";

import app from "../../src/app.js";
import { prisma } from "../../src/database.js";

import { recommendationFactory, deleteAllData } from "../factories/recomendationFactory.js";
beforeEach(async () => {
    await deleteAllData();
})

const agent = supertest(app);

describe("POST /recommendation ", () => {

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

    it("should not create a recommendation with a duplicate name", async () => {
        const recommendation = await recommendationFactory();
        recommendation.youtubeLink = "https://www.youtube.com/watch?v=pDbcC-xSat4"

        await agent.post("/recommendations").send(recommendation)

        const result = await agent.post("/recommendations").send(recommendation)

        expect(result.status).toBe(409);
    })

    it("should return a error because the link is not from you tube", async () => {
        const recommendation = await recommendationFactory();

        const result = await agent.post("/recommendations").send(recommendation)

        expect(result.status).toBe(422);
    })




});

describe("GET /recommendation ", () => {

    it("should return a list of recommendations", async () => {
        const recommendation = await recommendationFactory();
        recommendation.youtubeLink = "https://www.youtube.com/watch?v=pDbcC-xSat4"

        const recommendation2 = await recommendationFactory();
        recommendation2.youtubeLink = "https://www.youtube.com/watch?v=pDbcC-xSat4"

        await agent.post("/recommendations").send(recommendation)
        await agent.post("/recommendations").send(recommendation2)

        const result = await agent.get("/recommendations")

        expect(result.status).toBe(200);
        expect(result.body.length).toBe(2);
    });
});

describe("GET /random", () => {

    it("should return a random recommendation", async () => {
        const recommendation = await recommendationFactory();
        recommendation.youtubeLink = "https://www.youtube.com/watch?v=pDbcC-xSat4"

        const recommendation2 = await recommendationFactory();
        recommendation2.youtubeLink = "https://www.youtube.com/watch?v=pDbcC-xSat4"

        await agent.post("/recommendations").send(recommendation)
        await agent.post("/recommendations").send(recommendation2)

        const result = await agent.get("/recommendations/random")

        expect(result.status).toBe(200);
    });
});

describe("GET /top/:amount", () => {

    it("should return a list of top amount recommendations", async () => {
        const recommendation = await recommendationFactory();
        recommendation.youtubeLink = "https://www.youtube.com/watch?v=pDbcC-xSat4"

        const recommendation2 = await recommendationFactory();
        recommendation2.youtubeLink = "https://www.youtube.com/watch?v=pDbcC-xSat4"

        await agent.post("/recommendations").send(recommendation)
        await agent.post("/recommendations").send(recommendation2)

        const result = await agent.get("/recommendations/top/1")

        expect(result.status).toBe(200);
    });
})

describe("GET /:id", () => {

    it("should return a recommendation", async () => {
        const recommendation = await recommendationFactory();
        recommendation.youtubeLink = "https://www.youtube.com/watch?v=pDbcC-xSat4"

        await agent.post("/recommendations").send(recommendation)

        const result = await agent.get(`/recommendations/1`)

        expect(result.status).toBe(200);
        expect(result.body.name).toBe(recommendation.name);
    });

    it("should return a 404 error because the recommendation does not exist", async () => {
        const result = await agent.get(`/recommendations/1`)

        expect(result.status).toBe(404);
    })

})

describe("POST /upvote", () => {
    it("should increment the score of a recommendation", async () => {
        const recommendation = await recommendationFactory();
        recommendation.youtubeLink = "https://www.youtube.com/watch?v=pDbcC-xSat4"

        await agent.post("/recommendations").send(recommendation)

        const result = await agent.post(`/recommendations/1/upvote`)

        const recommendationUpdated = await prisma.recommendation.findFirst({
            where: {
                id: 1
            }
        });

        expect(result.status).toBe(200);
        expect(recommendationUpdated.score).toBe(1);
    })

    it("should return a error because the recommendation does not exist", async () => {
        const result = await agent.post(`/recommendations/1/upvote`)

        expect(result.status).toBe(404);
    })
})

describe("POST /downvote", () => {

    it("should decrement the score of a recommendation", async () => {
        const recommendation = await recommendationFactory();
        recommendation.youtubeLink = "https://www.youtube.com/watch?v=pDbcC-xSat4"

        await agent.post("/recommendations").send(recommendation)

        const result = await agent.post(`/recommendations/1/downvote`)

        const recommendationUpdated = await prisma.recommendation.findFirst({
            where: {
                id: 1
            }
        });

        expect(result.status).toBe(200);
        expect(recommendationUpdated.score).toBe(-1);
    })



    it("should return a error because the recommendation does not exist", async () => {
        const result = await agent.post(`/recommendations/1/downvote`)

        expect(result.status).toBe(404);
    })

    it("should delete the recommendation", async () => {
        const recommendation = await recommendationFactory();
        recommendation.youtubeLink = "https://www.youtube.com/watch?v=pDbcC-xSat4"

        await agent.post("/recommendations").send(recommendation)

        for (let i = 0; i < 6; i++) {
            await agent.post(`/recommendations/1/downvote`)
        }
        const recommendationDeleted = await prisma.recommendation.findFirst({
            where: {
                id: 1
            }
        });

        expect(recommendationDeleted).toBe(null);

    })

})


