import Locators from "../Locators";
import InputComponent from "../components/InputComponent";
import { additionalItems } from "../components/AdditionalItemsComponent";

export const entryDetailPage = {
    fillNewEntry(): Cypress.Chainable<JQuery> {
        return cy.get(Locators.nameField).type("Test name")
            .get(Locators.categoryField).find("input").type("TestKat");
    },
    fillCategory(text: string) {
        cy.get(Locators.categoryField).find("input").type(text).trigger("change")
            .get(`${Locators.categoryField} .sb-result-item`).should("be.visible")
            .contains(text).should("be.visible")
            .then($e => $e.click()); // workaround: onClick is not firing
            return this;
    },
    fillName(name: string) {
        cy.get(Locators.nameField).type(name);
        return this;
    },
    save(): Cypress.Chainable<JQuery> {
        return cy.get(Locators.saveBtn).click();
    },

    components: {
        nameField: new InputComponent(Locators.nameField),

        additionalItems: additionalItems
    }
}