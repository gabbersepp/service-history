import ServiceEntryListDto from "../../contracts/ServiceEntryListDto"
import Locators from "../support/Locators"
import { entryDetailPage } from "../support/pages/EntryDetailPage"
import { entryList } from "../support/pages/EntryList"

describe("Existing items should be loaded", () => {
    beforeEach(() => {
        cy.fixture("3-minimum-entries.json").then((items: ServiceEntryListDto) => {
            cy.window().its("localStorage").then(ls => {
                ls.setItem("scheckheft_data", JSON.stringify(items));
            })
        })
            .visit("/")
    })

    it("entry list items contain expected categories", () => {
        entryList.categories.should($items => {
            expect($items[0].textContent).to.contain("test 1 cat");
            expect($items[1].textContent).to.contain("test 2 cat");
        })
    })

    it("categories should be grouped", () => {
        entryList.categories.its("length").should("be", 2);
    })

    it("items shoud be displayed", () => {
        entryList.items.its("length").should("be", 3);
        entryList.items.should($items => {
            expect($items[0].textContent).to.contain("test 1 name");
            expect($items[1].textContent).to.contain("test 2 name");
            expect($items[2].textContent).to.contain("test 3 name");
        })
    })

    it("service entry is loaded on click", () => {
        entryList.open("test 1 name");
        entryDetailPage.components.nameField.getValue().should("contain", "test 1 name");
        entryList.open("test 2 name");
        entryDetailPage.components.nameField.getValue().should("contain", "test 2 name");
        entryList.open("test 3 name");
        entryDetailPage.components.nameField.getValue().should("contain", "test 3 name");
    })

    it("existing can be deleted", () => {
        entryList.open("test 1 name");
        entryDetailPage.delete();
        entryDetailPage.components.nameField.container.should("not.exist");
        entryList.items.should("not.contain", "test 1 name");
        cy.get(Locators.successMessageBox).should("be.visible");
    })
})