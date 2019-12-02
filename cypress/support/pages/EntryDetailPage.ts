import Locators from "../Locators";

export const entryDetailPage = {
    fillNewEntry(): Cypress.Chainable<JQuery> {
        return cy.get(Locators.nameField).type("Test name")
            .get(Locators.categoryField).find("input").type("TestKat");
    },
    fillCategory(text: string) {
        cy.get(Locators.categoryField).find("input").type(text).trigger("change")
            .get(`${Locators.categoryField} .sb-search-results`).contains(text).click();
            return this;
    },
    fillName(name: string) {
        cy.get(Locators.nameField).type("Test name");
        return this;
    },
    save(): Cypress.Chainable<JQuery> {
        return cy.get(Locators.saveBtn).click();
    }
}