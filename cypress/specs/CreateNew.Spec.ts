import { openPage } from "../support/BaseUiFunctions"
import Locators from "../support/Locators";
import { entryDetailPage } from "../support/pages/EntryDetailPage";
import { entryList } from "../support/pages/EntryList";

describe("New service entry", () => {
    beforeEach(() => {
        openPage().get(Locators.newEntryButton).click();
    })

    context("image selection", () => {
        it("Cancel image selection", () => {
            cy.get(Locators.logoSelection).click()
                .get(Locators.logos).should("be.visible").should("have.length.greaterThan", 0)
                .get("#is-overlay-background").click()
                .get(Locators.logos).should("not.be.visible")
        })
    })


    context("validation", () => {
        it("Validate mandatory fields", () => {
            cy.get(Locators.saveBtn).click()
                .get(Locators.errorMessageBox).should("be.visible");
        })
    })

    context("creation", () => {
        it("create valid entry", () => {
            entryDetailPage.fillNewEntry()
                .get(Locators.saveBtn).click()
                .get(Locators.successMessageBox).should("be.visible");
        })
    })

    context("category", () => {
        context("without pre-existing data", () => {
            it("should accept new category by typing category in", () => {
                entryDetailPage.fillCategory("TestCat").fillName("TestName").save().reload();
                entryList.allEntries.should("contain", "TestCat").and("contain", "TestName");
            })
            it("should accept new category by typing category in and accept it", () => {
                entryDetailPage.fillCategory("TestCat").fillName("TestName").save().reload();
                entryList.allEntries.should("contain", "TestCat").and("contain", "TestName");
            })
        })
    })
})