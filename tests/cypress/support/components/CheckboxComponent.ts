export default class CheckboxComponent {
    constructor(private locator: string) {
        this.locator = `${this.locator} .chk`
    }

    public isChecked() {
        return cy.get(`${this.locator}.chk-checked`);
    }

    public setValue(set: boolean) {
        return cy.get(this.locator).then($parent => {
            const $e = $parent.find(".chk-checked");
            if ($e.length === 0 && set) {
                cy.get(this.locator).click();
            } else if ($e.length > 0 && !set) {
                cy.get(this.locator).click();
            }
        });
    }
}