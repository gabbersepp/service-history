import { entryDetailPage } from "../support/pages/EntryDetailPage"
import { entryList } from "../support/pages/EntryList";
import { openNewEntryPage } from "../support/BaseUiFunctions";

describe("Additional items", () => {
    const additionalItems = entryDetailPage.components.additionalItems;

    describe("new service entry", () => {
        beforeEach(() => {
            openNewEntryPage();
        })

        it("additional items list should be empty initial", () => {
            additionalItems.container.find(" > div[id$='new-item-']").should("not.exist");
        })

        it("new item should be able to be added", () => {
            additionalItems.addNew();
            additionalItems.container.find(` > div[id='new-item-1']`).should("be.visible");
        })

        it("new item should be able to be filled", () => {
            const name = "additional item";
            additionalItems.addNew(name, true);
            entryDetailPage.fillName(name);
            entryDetailPage.save().reload();
            entryList.open(name);
            entryDetailPage.components.additionalItems.container.should("contain", name);
        })
    })
})