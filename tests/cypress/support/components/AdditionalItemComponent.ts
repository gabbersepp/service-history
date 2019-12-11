import InputComponent from "./InputComponent";
import CheckboxComponent from "./CheckboxComponent";

export default class AdditionalItemComponent {
    private locator: string;

    constructor(arg: number | string) {
        if (typeof arg === "string") {
            this.locator = arg;
        } else {
            this.locator = `div[id='new-item-${arg}']`;
        }
    }

    public get title() { return new InputComponent(this.locator); }

    public get checkbox() { return new CheckboxComponent(`${this.locator} .checkbox-component`); }
}