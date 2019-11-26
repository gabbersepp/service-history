import Locators from "./Locators";

export function openPage() {
    return cy.visit("/").get("nav button").should("exist");
}