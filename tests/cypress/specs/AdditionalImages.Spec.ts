import ServiceEntryListDto from "../../contracts/ServiceEntryListDto";
import { openPage } from "../support/BaseUiFunctions";
import { observeDOM } from "../support/MutationHelper";
import { entryList } from "../support/pages/EntryList";

describe("Additional Images", () => {
    // we can only test with existing entries because we can not mock the file dialog
    beforeEach(() => {
        // we must mock the loading of images
        openPage().window().its("localStorage").then(ls => {

            cy.fixture("with-additional-image.json").then((data: ServiceEntryListDto) => {
                ls.setItem("scheckheft_data", JSON.stringify(data));
                cy.reload();
                let img1: string;
                cy.fixture("img1.png", "base64").then((img: string) => img1 = img);
                cy.fixture("img2.png", "base64")
                    .then((img2: string) => {
                        observeDOM(Cypress.$("#root")[0], mutations => {
                            mutations.forEach(m => {
                                if (m.addedNodes.length === 0) {
                                    return;
                                }
                                const imgHolder = Cypress.$(m.addedNodes[0]).find(".image-holder img") as JQuery<HTMLImageElement>;
                                imgHolder[0].src = "data:image/png;base64," + img2;
                                imgHolder[1].src = "data:image/png;base64," + img1;
                            })
                        })
                    })
                entryList.open(data.items[0].name);
            });
        })
    })

    it("images are shown", () => {
        cy.get(".image-holder img").should($e => {
            const $holder = $e as JQuery<HTMLImageElement>;
            expect($holder[0].naturalWidth).to.greaterThan(0);
            expect($holder[1].naturalWidth).to.greaterThan(0);
        })
    })

    it("'x' appears on mouse over", () => {
        // TODO: cypress can not simulate :hover because pseudo classes can not be accessed in JS
        cy.get(".image-holder span").invoke("css", "display", "inline");
        cy.get(".image-holder span").first().should("be.visible");
    })

    it("image can be removed", () => {
        cy.get(".image-holder").its("length").should("be", 2);
        cy.get(".image-holder span").first().invoke("css", "display", "inline").click();
        cy.get(".image-holder").its("length").should("be", 1)
    })
})