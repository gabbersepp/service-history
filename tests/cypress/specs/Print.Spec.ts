import ServiceEntryListDto from "../../contracts/ServiceEntryListDto";
import { openNewEntryPage } from "../support/BaseUiFunctions";
import Locators from "../support/Locators";
import { entryDetailPage } from "../support/pages/EntryDetailPage";
import { entryList } from "../support/pages/EntryList";

describe("Non printable view", () => {
    beforeEach(() => {
        openNewEntryPage();
    })

    it("'text area should not be visible' should fsil in displayable view", (done) => {
        cy.on("fail", (err: Error) => {
            debugger;
            if (err.message.indexOf("Timed out retrying: expected '<textarea>' not to be 'visible'") > -1) {
                done();
            }
        })
        entryDetailPage.components.notesField.should("not.be.visible");
    })
})

describe("Printable view", () => {
    describe("without existing data", () => {
        before(() => {
            openNewEntryPage().then(() => cy.task("activatePrintMediaQuery"));
        })

        it("text area should not be visible", () => {
            entryDetailPage.components.notesField.should("not.be.visible");
        })

        it("'New' button should not be visible", () => {
            cy.get(Locators.newEntryButton).should("not.be.visible");
        })
    })

    describe("with existing data", () => {
        beforeEach(() => {
            cy.fixture("with-additional-image.json").then((data: ServiceEntryListDto) => {
                cy.window().its("localStorage").then(store => {
                    store.setItem("scheckheft_data", JSON.stringify(data));
                }).visit("/")
            }).then(() => {
                entryList.open("test 1 name").task("activatePrintMediaQuery");
            });
        });

        it("images should not be visible", () => {
            cy.get(".img-holder").should("not.be.visible")
        })

        it("'notes' field should show all content", () => {
            cy.get("#marker-notes").matchImageSnapshot();
        })
    })
})