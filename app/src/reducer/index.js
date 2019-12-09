import { showMessage } from "./../components/elements/Message";
import * as dataStore from "./../logic/DataStore";

function data(state = {}, action) {
    state = state.wrapping || {};

    if (action.type === "DATA") {
        let last = state;
        let name = null;
        let splits = action.property.split(".");
        splits.forEach((item, index) => {
            if (index !== splits.length - 1) {
                last[item] = last[item] || {};
                last = last[item];
            }
            name = item;
        });

        last[name] = action.value;
    } else if (action.type === "DATA_ALL") {
        state = action.data;
    }

    return { wrapping: state };
}

function items(items, action) {
    if (action.type === "ADD_ITEM") {
        items.push(action.item);
        return [].concat(items);
    } else if (action.type === "ADD_ITEMS") {
        return [].concat(action.items);
    } else if (action.type === "DELETE_ITEM") {
        return [].concat(action.items.filter(x => x.id !== action.itemId));
    } else {
        return items;
    }
}

function save(state = {}, action) {
    if (action.type === "SAVE") {
        const items = state.items;
        dataStore.save({ items: items });
        // TODO: check return value
        showMessage("success", "Daten gespeichert");
    }
}

const initialState = {
    data: {},
    items: [],
    message: {}
}

export function reduce(state = initialState, action) {
    save(state, action);
    return {
        data: data(state.data, action),
        items: items(state.items, action)
    }
}