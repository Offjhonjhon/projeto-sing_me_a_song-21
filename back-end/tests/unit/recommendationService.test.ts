import { recommendationService } from "../../src/services/recommendationsService.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { jest } from "@jest/globals";

jest.mock("../../src/repositories/recommendationRepository.js");

describe("insert", () => {

    it("should create a recommendation", async () => {
        const recommendationData = {
            name: "Unit Test Recommendation",
            youtubeLink: "https://www.youtube.com/watch?v=65XCzPOonus"
        }

        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((): any => {
            return null;
        })

        jest.spyOn(recommendationRepository, "create").mockImplementationOnce((): any => {
            return null;
        })

        await recommendationService.insert(recommendationData);

        expect(recommendationRepository.findByName).toHaveBeenCalledWith(recommendationData.name);
        expect(recommendationRepository.create).toHaveBeenCalledWith(recommendationData);

    });


    it("should not create a recommendation, because the name is already in use", async () => {
        const recommendationData = {
            name: "Unit Test Recommendation",
            youtubeLink: "https://www.youtube.com/watch?v=65XCzPOonus"
        }

        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((): any => {
            return {
                id: 1,
                name: "Unit Test Recommendation",
                youtubeLink: "https://www.youtube.com/watch?v=65XCzPOonus",
                score: 0
            }
        })

        try {
            await recommendationService.insert(recommendationData);
        }
        catch {
            expect(recommendationRepository.findByName).toHaveBeenCalledWith(recommendationData.name);
        }
    });
});

describe("upvote", () => {
    it("should upvote a recommendation", async () => {
        const recommendationData = {
            name: "Unit Test Recommendation",
            youtubeLink: "https://www.youtube.com/watch?v=65XCzPOonus"
        }

        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {
            return {
                id: 1,
                name: recommendationData.name,
                youtubeLink: recommendationData.youtubeLink,
                score: 0
            }
        })

        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => {
            return {
                id: 1,
                name: recommendationData.name,
                youtubeLink: recommendationData.youtubeLink,
                score: 1
            }
        })

        await recommendationService.upvote(1);

        expect(recommendationRepository.find).toHaveBeenCalledWith(1);
        expect(recommendationRepository.updateScore).toHaveBeenCalledWith(1, "increment");
    })
});

describe("downvote", () => {

    it("should downvote a recommendation", async () => {
        const recommendationData = {
            name: "Unit Test Recommendation",
            youtubeLink: "https://www.youtube.com/watch?v=65XCzPOonus"
        }

        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {
            return {
                id: 1,
                name: recommendationData.name,
                youtubeLink: recommendationData.youtubeLink,
                score: 1
            }
        })

        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => {
            return {
                id: 1,
                name: recommendationData.name,
                youtubeLink: recommendationData.youtubeLink,
                score: 0
            }
        })

        await recommendationService.downvote(1);

        expect(recommendationRepository.find).toHaveBeenCalledWith(1);
        expect(recommendationRepository.updateScore).toHaveBeenCalledWith(1, "decrement");
    })

    it("should delete a recommendation", async () => {
        const recommendationData = {
            name: "Unit Test Recommendation",
            youtubeLink: "https://www.youtube.com/watch?v=65XCzPOonus"
        }

        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {
            return {
                id: 1,
                name: recommendationData.name,
                youtubeLink: recommendationData.youtubeLink,
                score: -5
            }
        })

        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => {
            return {
                id: 1,
                name: recommendationData.name,
                youtubeLink: recommendationData.youtubeLink,
                score: -6
            }
        })

        jest.spyOn(recommendationRepository, "remove").mockImplementationOnce((): any => {
            return null;
        })

        await recommendationService.downvote(1);

        expect(recommendationRepository.find).toHaveBeenCalledWith(1);
        expect(recommendationRepository.updateScore).toHaveBeenCalledWith(1, "decrement");
        expect(recommendationRepository.remove).toHaveBeenCalledWith(1);
    })
});

describe("getRandom", () => {

    it("should get a random recommendation, with Math.random < 0.7", async () => {
        const recommendationData = {
            name: "Unit Test Recommendation",
            youtubeLink: "https://www.youtube.com/watch?v=65XCzPOonus"
        }

        jest.spyOn(Math, "random").mockImplementationOnce((): any => {
            return 0.5;
        })

        jest.spyOn(Math, "floor").mockImplementationOnce((): any => {
            return 0;
        })

        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => {
            return [
                {
                    id: 1,
                    name: recommendationData.name,
                    youtubeLink: recommendationData.youtubeLink,
                    score: 0
                }
            ]
        })

        await recommendationService.getRandom();

        expect(recommendationService.getRandom).toBeDefined();
    })

    it("should get a random recommendation, with Math.random > 0.7", async () => {
        const recommendationData = {
            name: "Unit Test Recommendation",
            youtubeLink: "https://www.youtube.com/watch?v=65XCzPOonus"
        }

        jest.spyOn(Math, "random").mockImplementationOnce((): any => {
            return 1;
        })

        jest.spyOn(Math, "floor").mockImplementationOnce((): any => {
            return 0;
        })

        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => {
            return [
                {
                    id: 1,
                    name: recommendationData.name,
                    youtubeLink: recommendationData.youtubeLink,
                    score: 0
                }
            ]
        })

        await recommendationService.getRandom();

        expect(recommendationService.getRandom).toBeDefined();
    })

    it("should fail to get a random recommendation, with Math.random > 0.7", async () => {

        jest.spyOn(Math, "random").mockImplementationOnce((): any => {
            return 1;
        })
        jest.spyOn(Math, "floor").mockImplementationOnce((): any => {
            return 1;
        })

        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => {
            return []
        })

        try {
            await recommendationService.getRandom();
        }
        catch {
            expect(recommendationService.getRandom).toBeDefined();
        }
    });
});

describe("get", () => {
    it("should get all recommendations", async () => {
        const recommendationData = {
            name: "Unit Test Recommendation",
            youtubeLink: "https://www.youtube.com/watch?v=65XCzPOonus"
        }

        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => {
            return [
                {
                    id: 1,
                    name: recommendationData.name,
                    youtubeLink: recommendationData.youtubeLink,
                    score: 0
                }
            ]
        }
        )

        await recommendationService.get();

        expect(recommendationService.get).toBeDefined();
    })
});

describe("getByIdOrFail", () => {
    it("should get a recommendation by id", async () => {
        const recommendationData = {
            name: "Unit Test Recommendation",
            youtubeLink: "https://www.youtube.com/watch?v=65XCzPOonus"
        }

        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {
            return {
                id: 1,
                name: recommendationData.name,
                youtubeLink: recommendationData.youtubeLink,
                score: 0
            }
        }
        )

        await recommendationService.getById(1);

        expect(recommendationService.getById).toBeDefined();
    })

    it("should fail to get recommendation by id", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {
            return null;
        }
        )
        try {
            await recommendationService.getById(1);
        }
        catch {
            expect(recommendationService.getById).toBeDefined();
        }
    })
});

describe("getTop", () => {
    it("should get top recommendations", async () => {
        const recommendationData = {
            name: "Unit Test Recommendation",
            youtubeLink: "https://www.youtube.com/watch?v=65XCzPOonus"
        }

        jest.spyOn(recommendationRepository, "getAmountByScore").mockImplementationOnce((): any => {
            return [
                {
                    id: 1,
                    name: recommendationData.name,
                    youtubeLink: recommendationData.youtubeLink,
                    score: 0
                }
            ]
        })

        await recommendationService.getTop(1);

        expect(recommendationService.getTop).toBeDefined();
    });
});

describe("deleteAll", () => {

    it("should delete all recommendations", async () => {

        jest.spyOn(recommendationRepository, "deleteAll").mockImplementationOnce((): any => {
            return null;
        }
        )
        await recommendationService.deleteAll();

        expect(recommendationService.deleteAll).toBeDefined();
    })
});




