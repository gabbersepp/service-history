import Locators from "../Locators";
import InputComponent from "../components/InputComponent";

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
            entryList.components.nameField.getValue().should("contain", name))
    },

    components: {
        nameField: new InputComponent(Locators.nameField)
    }
}