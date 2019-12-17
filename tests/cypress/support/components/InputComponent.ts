export default class InputComponent {
    constructor(private locator: string) {
        this.locator = `${this.locator} input`;
    }

    public get container() {
        return cy.get(this.locator);
    }

    public getValue() {
        return this.container.invoke("val") as any as Cypress.Chainable<string>;
    }

    public setValue(str: string) {
        return this.container.type(str);
    }
}