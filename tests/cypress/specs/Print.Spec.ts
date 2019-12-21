import { openNewEntryPage } from "../support/BaseUiFunctions";
import { entryDetailPage } from "../support/pages/EntryDetailPage";

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
    beforeEach(() => {
        openNewEntryPage().then(() => cy.task("activatePrintMediaQuery"));
    })

    it("'text area should not be visible' in print view", () => {
        entryDetailPage.components.notesField.should("not.be.visible");
    })
})