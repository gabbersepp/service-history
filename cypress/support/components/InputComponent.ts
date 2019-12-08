export default class InputComponent {
    constructor(private locator: string) {
        this.locator = `${this.locator} input`;
    }

    public getValue() {
        return cy.get(this.locator).invoke("val") as any as Cypress.Chainable<string>;
    }
}