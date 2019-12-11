import { openNewEntryPage } from "../support/BaseUiFunctions";
import { entryDetailPage } from "../support/pages/EntryDetailPage";

describe("Yes-No component", () => {
    let comps = entryDetailPage.components.oilChangeService.components;

    beforeEach(() => {
        openNewEntryPage();
    })

    it("yes checkboxes can be set and unset", () => {
        comps.yes.setValue(true);
        comps.yes.isChecked().should("exist");
        comps.yes.setValue(false);
        comps.yes.isChecked().should("not.exist");
    })

    it("no checkboxes can be set", () => {
        comps.no.setValue(true);
        comps.no.isChecked().should("exist");
        comps.no.setValue(false);
        comps.no.isChecked().should("not.exist");
    })

    it("set either 'yes' or 'no'", () => {
        comps.no.setValue(true);
        comps.yes.isChecked().should("not.exist");
        comps.yes.setValue(true);
        comps.no.isChecked().should("not.exist");
    })
})