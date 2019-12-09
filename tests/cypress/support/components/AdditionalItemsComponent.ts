import Locators from "../Locators"
import InputComponent from "./InputComponent";

export const additionalItems = {
    get container() {
        return cy.get(Locators.additionalItemsContainer);
    },
    addNew(title?: string, checked?: boolean) {
        const newItem = cy.get(Locators.newAdditionalItem).click();
        if (title) {
            additionalItems.lastItem.title.setValue(title);
        }
        return newItem;
    },
    lastItem: {
        title: new InputComponent(Locators.lastAdditionalItem)
    }
}