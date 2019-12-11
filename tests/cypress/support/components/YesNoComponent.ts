import CheckboxComponent from "./CheckboxComponent";

export default class YesNoComponent {
    constructor(private locator: string) {
    }

    public get components() {
        return {
            yes: new CheckboxComponent(`${this.locator} :nth-child(2).checkbox-component`),
            no: new CheckboxComponent(`${this.locator} :nth-child(3).checkbox-component`)
        }
    }
}