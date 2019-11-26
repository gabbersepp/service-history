import { openPage } from "../support/BaseUiFunctions"

describe("Dashboard", () => {
    it("should load", () => {
        openPage().should("exist");
    })

    it("should contain images", () => {
        openPage().get(".image-list *[style^='background-image']").should("have.length.greaterThan", 0);
    })
})