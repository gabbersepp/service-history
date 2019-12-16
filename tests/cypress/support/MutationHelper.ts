// helper function to observe DOM changes
export function observeDOM(obj: Element, callback: (mutations: MutationRecord[]) => void) {
    if (!obj || obj.nodeType !== Node.ELEMENT_NODE) {
        throw new Error("can not observe this element");
    }

    var obs = new MutationObserver(mutations => {
        callback(mutations);
    });
    obs.observe(obj, { childList: true, subtree: true });
}