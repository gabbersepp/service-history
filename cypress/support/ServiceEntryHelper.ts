import Locators from "./Locators";

export default class ServiceEntryHelper {
    public fillNewEntry(): Cypress.Chainable<JQuery> {
        return cy.get(Locators.nameField).type("Test name")
            .get(Locators.categoryField).find("input").type("TestKat");
    }
}