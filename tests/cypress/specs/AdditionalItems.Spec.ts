import { entryDetailPage } from "../support/pages/EntryDetailPage"
import { entryList } from "../support/pages/EntryList";
import { openNewEntryPage } from "../support/BaseUiFunctions";
import ServiceEntryDto from "../../contracts/ServiceEntryDto";
import ServiceEntryListDto from "../../contracts/ServiceEntryListDto";

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

    describe("existing service entry", () => {
        beforeEach(() => {
            openNewEntryPage().window().its("localStorage").then(ls => {
                cy.fixture("service-entry-with-additional-items.json").then((data: ServiceEntryListDto) => {
                    ls.setItem("scheckheft_data", JSON.stringify(data));
                    cy.reload();
                    entryList.open(data.items[0].name);
                })
            })
        })

        it("additional items should be visible", () => {
            entryDetailPage.components.additionalItems.item(1).title.getValue().should("contain", "additional field 1");
            entryDetailPage.components.additionalItems.item(2).title.getValue().should("contain", "additional field 2");
            entryDetailPage.components.additionalItems.item(3).title.getValue().should("contain", "additional field 3");
        })
    })
})