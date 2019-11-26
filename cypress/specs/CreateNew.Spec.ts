import { openPage } from "../support/BaseUiFunctions"
import Locators from "../support/Locators";
import ServiceEntryHelper from "../support/ServiceEntryHelper";

describe("Create new service entry", () => {
    const entryHelper = new ServiceEntryHelper();

    beforeEach(() => {
        openPage().get(Locators.newEntryButton).click();
    })

    it("Cancel image selection", () => {
        cy.get(Locators.logoSelection).click()
            .get(Locators.logos).should("be.visible").should("have.length.greaterThan", 0)
            .get("#is-overlay-background").click()
            .get(Locators.logos).should("not.be.visible")
    })

    it("Validate mandatory fields", () => {
        cy.get(Locators.saveBtn).click()
            .get(Locators.errorMessageBox).should("be.visible");
    })

    it("create valid entry", () => {
        entryHelper.fillNewEntry()
            .get(Locators.saveBtn).click()
            .get(Locators.successMessageBox).should("be.visible");
    })
})