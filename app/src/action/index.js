export function data(property, value) {
    return { type: "DATA", property: property, value: value };
}

export function dataAll(data) {
    return { type: "DATA_ALL", data: data };
}

export function message(type, message) {
    return { type: "MESSAGE", msgType: type, message: message };
}

export function addItem(item) {
    return { type: "ADD_ITEM", item: item };
}

export function addItems(items) {
    return { type: "ADD_ITEMS", items: items };
}

export function deleteItem(items, itemId) {
    return { type: "DELETE_ITEM", items: items, itemId: itemId };
}

export function save() {
    return {type: "SAVE" };
}