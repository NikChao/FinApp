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
            arrayOptions: []
        };

        // method binding
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleOptionalCheckbox = this.handleOptionalCheckbox.bind(this);
        this.renderList = this.renderList.bind(this);

        this.renderTable = this.renderTable.bind(this);
        this.renderTableHeadings = this.renderTableHeadings.bind(this);

        this.addPlaceHolderObjects = this.addPlaceHolderObjects.bind(this);
    }

    handleAddOption(event)
    {
        event.preventDefault();
        var nameComponent = document.getElementById("option-name").value; // get name
        var actionComponent = document.getElementById("option-action").value; // get action
        var priceComponent = document.getElementById("option-price").value; // get price
        var newOptionObject = {name: nameComponent, action: actionComponent, price: priceComponent}; // create object
        var dupArrayOptions = this.state.arrayOptions.slice(); // duplicate array
        dupArrayOptions.push(newOptionObject); // add object to array
        this.setState({arrayOptions: dupArrayOptions}); // update state

    }

    handleOptionalCheckbox() {
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
        for (var i = 0; i < this.state.arrayOptions.length; i++) {
            var string = "option: " + this.state.arrayOptions[i].action + " " + this.state.arrayOptions[i].name
                    + " price: " + this.state.arrayOptions[i].price;
            arrayOptionDescription.push(string);
        }
        const listOptionDescription = arrayOptionDescription.map((description) => <li>{description}</li>);
        return listOptionDescription;
    }

    renderTable() {

    }
    renderTableHeadings() {
      /*  var listTableHeadings = [];
        // writing first heading
        var string = "0 < " + this.state.arrayOptions[i].price;
        listTableHeadings.push(string);

        // writing middle headings
        for (var i = 1; i < this.state.arrayOptions.length - 1; i++) {
            var string = this.state.arrayOptions[i].price + " < " + this.state.arrayOptions[i + 1].price;
            listTableHeadings.push(string);
        }

        // writing last heading
        var string = this.state.arrayOptions[i].price + " >  x";
        listTableHeadings.push(string);
        const listElement = listTableHeadings.map((heading) => <th>{heading}</th>);
        return listElement;*/
    }

    addPlaceHolderObjects() {
        /*if (this.state.arrayOptions.length == 0) {
            var one = {name: "oneName", action: "oneAction", price: "onePrice"};
            //var two = {name: "twoName", action: "twoAction", price: "twoPrice"};
            //var three = {name: "threeName", action: "threeAction", price: "threePrice"};
            var arrayPlaceholder = [];
            arrayPlaceholder.push(one);
            //arrayPlaceholder.push(two);
            //arrayPlaceholder.push(three);
            this.setState({arrayOptions: arrayPlaceholder});
        } */
    }



    render()
    {
        return (
            <div>
                <form>
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

                <div id="optional-checkbox">
                    <p> <strong> Optional Diagrams </strong> </p>
                    <Input label="List Of Optinos" type="checkbox" value="table" name="c-option-list" id="c-option-list" />
                    <br />
                    <Input label="Payoff Table" type="checkbox" value="ist" name="c-payoff-table" id="c-payoff-table" />
                    <br />
                </div>

                <h1> {this.addPlaceHolderObjects()} </h1>

                <p> <strong> Optional Diagrams </strong> </p>
                <ul> {this.renderList()} </ul>

                <div id="option-content">
                    <table>
                        <thead> {this.renderTableHeadings()} </thead>
                        <tbody>

                        </tbody>
                    </table>

                    <ul> </ul>
                    <p id="table-content"> </p>
                </div>

                <br /> <br /> <br />

                <div id="testing">
                    <p id="example">swagger</p>
                    <Input id="test" label="test" onChange={this.handleAddOption} />
                    <p id="example2"> empty </p>
                </div>


            </div>
            /* add divisions for list and table */
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
