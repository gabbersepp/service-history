import Locators from "../Locators"
import InputComponent from "./InputComponent";
import AdditionalItemComponent from "./AdditionalItemComponent";

export const additionalItems = {
    get container() {
        return cy.get(Locators.additionalItemsContainer);
    },
    addNew(title?: string, checked?: boolean) {
        const newItem = cy.get(Locators.newAdditionalItem).click();
        if (title) {
            additionalItems.lastItem.title.setValue(title);
        }
        if (checked) {
            additionalItems.lastItem.checkbox.setValue(checked);
        }
        return newItem;
    },
    lastItem: new AdditionalItemComponent(Locators.lastAdditionalItem),
    item(i: number) {
        return new AdditionalItemComponent(i);
    }
}