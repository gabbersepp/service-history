import Locators from "./Locators";

export function openPage() {
    return cy.visit("/").get("nav button").should("exist");
}

export function openNewEntryPage() {
    return openPage().get(Locators.newEntryButton).click();
}