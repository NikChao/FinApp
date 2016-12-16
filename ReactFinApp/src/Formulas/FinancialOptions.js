import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Button, Icon, Dropdown, Navbar, NavItem, Input, Select} from 'react-materialize';

export default class FinancialOptions extends Component
{
    constructor(props)
    {
        super(props)

        // state
        this.state =
        {
            // arrayOfOptions: [],      // Elements should be tuple of option name and option price
            // name: "",        // to retrieve text in name input
            // price: "",       // to retrieve text in price input

            // Messing arround below
            listOptions: []
        };

        // method binding
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleOptionalCheckbox = this.handleOptionalCheckbox.bind(this);
        this.renderList = this.renderList.bind(this);

        this.renderTable = this.renderTable.bind(this);
        this.renderTableHeading = this.renderTableHeading.bind(this);
        this.renderTableBody = this.renderTableBody.bind(this);
    }

    handleAddOption(event)
    {
        event.preventDefault();
        var nameComponent = document.getElementById("option-name").value; // get name
        var actionComponent = document.getElementById("option-action").value; // get action
        var priceComponent = document.getElementById("option-price").value; // get price
        var newOptionObject = {name: nameComponent, action: actionComponent, price: priceComponent}; // create object
        var dupListOptions = this.state.listOptions.slice(); // duplicate array
        dupListOptions.push(newOptionObject); // add object to array
        this.setState({listOptions: dupListOptions}); // update state

    }

    handleOptionalCheckbox()
    {
        var list = document.getElementById("c-option-list");
        var table = document.getElementById("c-payoff-table");

        if (list.checked === true) {
            //document.getElementById("list-content").innerHTML = renderList();
        }
        if (table.checked === true) {
            //document.getElementById("table-content").innerHTML = renderTable();
        }

    }
    renderList() {
        var arrayOptionDescription = [];
        for (var i = 0; i < this.state.listOptions.length; i++) {
            var string = "Option Type: " + this.state.listOptions[i].name + " "
                    "Option Action: " + this.state.listOptions[i].action + " " +
                    " Option Price: " + this.state.listOptions[i].price;
            arrayOptionDescription.push(string);
        }
        const mappedOptionDescription = arrayOptionDescription.map((description) => <li>{description}</li>);
        return (
            <div>
                <p> <strong> List of Current Options </strong> </p>
                <ul>
                    {mappedOptionDescription}
                </ul>
            </div>
        );
    }

    renderTable()
    {
        /* <table> </table> tags from return statement of tableheading and tablebody function needs to be removed
        and added here. the prior functions need to return the <thead> and <tbody> to this function where they will be wrapped
        in a <table> tag */
    }

    renderTableHeading()
    {
        var listTableHeadings = [];
        var heading;

        // generating table heading string
        for (var i = 0; i < this.state.listOptions.length; i++) {
            if (i === 0) {
                // writing first heading
                heading = "---";
                listTableHeadings.push(heading);
                heading = "0 < SP < " + this.state.listOptions[i].price;
            } else if (i === this.state.listOptions.length - 1) {
                // writing last heading
                heading = this.state.listOptions[i].price + " < SP <  oo";
            } else {
                heading = this.state.listOptions[i].price + " < SP < " + this.state.listOptions[i + 1].price;
            }

            // adding heading string to array
            listTableHeadings.push(heading);
        }

        // mapping array of headings to react table heading element
        const listElement = listTableHeadings.map(
            (heading) => <th>{heading}</th>
        );
        return (
            <div>
                <p> <strong> Payoff-Table </strong> </p>
                <table>
                    <thead> {listElement} </thead>
                </table>
            </div>
        );
    }

    renderTableBody()
    {
        /* var listTableHeadings = [];
        var heading = 0;
        // compute one row for each option
        for (var i = 0; i < this.state.listOptions.length; i++) {
            // compute N columns for each option
            for(var i = 0; i < this.state.listOptions.length; i++) {
                heading += 1;
                listTableHeadings.push(heading);
            }
            const listElement = listTableHeadings.map(
                (heading) => <th>{heading}</th>
            );
            var tableRow = <tr>{listElement}</tr>;
        }

        return (
            <table><tbody>{tableRow}</tbody><table>
        ); */
    }


    render()
    {
        return (
            <div>
                <form id="add-option-form">
                      <Input id="option-name" type='select' label="Financial Option">
                        <option value='- select -'> </option>
                        <option value='put'>Put</option>
                        <option value='call'>Call</option>
                      </Input>
                      <Input id="option-action" type='select' label="Option Type">
                        <option value='- select -'> </option>
                        <option value='short'>Short</option>
                        <option value='long'>Long</option>
                      </Input>
                      <Input id="option-price" type='text' label="Option Price">
                      </Input>
                      <Button id="add-option-btn" waves='light' onClick={this.handleAddOption} >Add Option</Button>
                </form>

                <div id="optional-features-checkbox">
                    <p> <strong> Optional Diagrams </strong> </p>
                    <Input label="List Of Optinos" type="checkbox" value="table" name="c-option-list" id="c-option-list" />
                    <br />
                    <Input label="Payoff Table" type="checkbox" value="ist" name="c-payoff-table" id="c-payoff-table" />
                    <br />
                </div>

                <div id="content-option-list">
                    {this.renderList()}
                </div>

                <div id="content-option-payoff-table">
                    {this.renderTableHeading()}
                    {this.renderTableBody()}
                </div>
            </div>
        );
    }
}
/*
    makeTableFromOptionArray (name, x)
    {
    // Should add a new row for each element in array - for option
    // Should add column for each element in array - for range 0 < X < 50... etc....
    // Will need a function that mutates the table based on number of elements in array
    // table should be scrollable sideways
    return (
        <div>
            <table>
                <thead>
                    <th> Option </th>
                    <th> P1 </th>
                </thead>
                <tbody>
                    <tr>
                        <th> {this.state.currentArray[2]} </th>
                        <th> {this.state.x} </th>
                    </tr>
                    <tr>
                        <th> {this.state.currentArray[3]} </th>
                        <th> {this.state.x} </th>
                    </tr>
                </tbody>
            </table>
        </div>);
    }
    }*/


/*
       // testing
        var oneElement = document.getElementById("example");
        var twoElement = document.getElementById("test");
        //oneElement.innerHTML=this.state.arrayOptions[0];
        var size = this.state.arrayOptions.length
        oneElement.innerHTML=this.state.arrayOptions[0].name;
*/
