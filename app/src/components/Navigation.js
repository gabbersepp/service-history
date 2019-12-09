import React, { Component } from "react";
import { dataAll, addItem } from "./../action/index";
import { connect} from "react-redux";
import "./../style/navigation.css";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.lastItemsTimeStamp = "";
    }
    newEntry() {
        this.lastItemsTimeStamp = Date.now();
        const newItem = { id: this.lastItemsTimeStamp, category: ""};
        this.props.dataAll(newItem);
        this.props.addItem(newItem);
    }

    getTree() {
        const grouping = {};
        this.props.items.forEach(i => {
            const array = grouping[i.category] || [];
            grouping[i.category] = array;
            array.push(i);
        });
        return grouping;
    }
    render() {
        const grouping = this.getTree();
        const iterable = Object.keys(grouping);

        return (
            
		<nav>
            <button onClick={() => this.newEntry()} id="new-entry">Neuer Eintrag</button>
            <ul>
                {iterable.map(key => (
                    <li key={grouping[key][0].category}>{grouping[key][0].category}
                        <ul className="indented">
                            {grouping[key].map(item => (                               
                                <li key={item.id} onClick={() => this.load(item.id)}>{item.name} - {item.date}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </nav>
        )
    }

    load(id) {
        this.props.dataAll(this.props.items.find(x => x.id === id));
    }
}

const mapStateToProps = function(state) {
    return {
        items: state.items,
        currentEntry: state.data.wrapping,
        dataWrapping: state.data // only there to get updates
    }
}
const mapDispatchToProps = {
    dataAll: dataAll,
    addItem: addItem
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);