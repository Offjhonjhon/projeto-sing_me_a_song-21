/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

const testLink = "https://www.youtube.com/watch?v=Y88LVU7MAe4&list=PLOWDZJe5wh3j2HkdsxNe7yDeZrow5XRsD"
const URL = "http://localhost:3000";

beforeEach(() => {
  cy.resetDatabase();
})

describe("create recommendation suit test", () => {

  it("should create a recommendation", () => {
    const recommendation = {
      name: faker.lorem.word(),
      link: testLink
    };

    cy.visit(`${URL}/`);

    cy.get("#name").type(recommendation.name);
    cy.get("#link").type(recommendation.link);
    cy.get("#createRecommendation").click();

    cy.contains(recommendation.name);

  })

  it("should go to tops page", () => {
    cy.visit(`${URL}/`);
    cy.get("#top").click();
    cy.url().should("include", "/top");
  })

  it("should go to random page", () => {
    cy.visit(`${URL}/`);
    cy.get("#random").click();
    cy.url().should("include", "/random");
  })

  it("should go to home page", () => {
    cy.visit(`${URL}/`);
    cy.get("#home").click();
    cy.url().should("include", "/");
  })
})