import { prisma } from "../../src/database.js";
import { faker } from "@faker-js/faker";

export async function recommendationFactory() {
    const recommendation = {
        name: faker.internet.userName(),
        youtubeLink: faker.internet.url()
    }

    return recommendation;
}

export async function deleteAllData() {
    await prisma.$transaction([
        prisma.$executeRaw`TRUNCATE TABLE recommendations`,
    ]);
}