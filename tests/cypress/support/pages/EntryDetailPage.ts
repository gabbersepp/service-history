import { additionalItems } from "../components/AdditionalItemsComponent";
import InputComponent from "../components/InputComponent";
import YesNoComponent from "../components/YesNoComponent";
import Locators from "../Locators";

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
    delete(): Cypress.Chainable<JQuery> {
        return cy.get(Locators.deleteBtn).click()
            .get("#msg-box-container button").first().click();
    },

    components: {
        nameField: new InputComponent(Locators.nameField),

        additionalItems: additionalItems,
        oilChangeService: new YesNoComponent(Locators.oilChangeService)
    }
}