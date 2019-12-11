export default class CheckboxComponent {
    constructor(private locator: string) {
        this.locator = `${this.locator} ${this.locator.indexOf(".checkbox-component") <= -1 ? ".checkbox-component" : ""} .chk`
    }

    public isChecked() {
        return cy.get(`${this.locator}.chk-checked`);
    }

    public setValue(set: boolean) {
        return cy.get(this.locator).then($parent => {
            const isChecked = $parent.is(".chk-checked");
            debugger;
            if (!isChecked && set) {
                cy.get(this.locator).click();
            } else if (isChecked && !set) {
                cy.get(this.locator).click();
            }
        });
    }
}