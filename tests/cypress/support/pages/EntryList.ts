import { entryDetailPage } from "./EntryDetailPage";

export const entryList = {
    get container() {
        return cy.get("nav > ul");
    },
    get categories() {
        return entryList.container.find(" > li");
    },
    get items() {
        return entryList.categories.find(" > ul > li");
    },
    open(name: string) {
        return entryList.items.contains(name).click().then(() => 
            entryDetailPage.components.nameField.getValue().should("contain", name))
    }
}