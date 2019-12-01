import { openPage } from "../support/BaseUiFunctions"
import Locators from "../support/Locators";
import * as entryPage from "../support/pages/EntryDetailPage";

describe("Create new service entry", () => {
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
        entryPage.fillNewEntry()
            .get(Locators.saveBtn).click()
            .get(Locators.successMessageBox).should("be.visible");
    })
})