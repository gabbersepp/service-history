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
                //.get("#is-overlay-background").click()
                //.get(Locators.logos).should("not.be.visible")
                // TODO: add tests after refactoring
        })
    })

    /*context("validation", () => {
        it("Validate mandatory fields", () => {
            cy.get(Locators.saveBtn).click()
                .get(Locators.errorMessageBox).should("be.visible");
        })
    })*/ // TODO: add after refactoring

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
                entryList.container.should("contain", "TestCat").and("contain", "TestName");
            })
        })

        context("with pre-existing data", () => {
            beforeEach(() => {
                cy.window().then(window => {
                    cy.fixture("service-entries.json").then(data => {
                        window.localStorage.setItem("scheckheft_data", JSON.stringify(data));
                    }).reload();
                })
            })
 
            it("fixture data must be available", () => {
                entryList.container.should("contain", "test name")
            })
        })
    })
})