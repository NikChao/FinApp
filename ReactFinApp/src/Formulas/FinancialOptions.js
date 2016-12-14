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
            arrayOptions: [],
            name: ""

        };

        // method binding
        this.makeTableFromOptionArray = this.makeTableFromOptionArray.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleOptionalCheckbox = this.handleOptionalCheckbox.bind(this);
        this.renderList = this.renderList.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.changeArray = this.changeArray.bind(this);
    }

    changeArray() {
        //var arrayOption = ['3', '2', '];
        //this.setState({arrayOptions: arrayOption});

    }

    handleAddOption(event)
    {
        var nameComponent = document.getElementById("option-name").value;
        var actionComponent = document.getElementById("option-action".value);
        var newOptionObject = {name: nameComponent, action: actionComponent};
        var newArrayOptions = this.state.arrayOptions.slice();
        newArrayOptions.push(newOptionObject);
        this.setState({arrayOptions: newArrayOptions});

       // testing
        var oneElement = document.getElementById("example");
        var twoElement = document.getElementById("test");
        //oneElement.innerHTML=this.state.arrayOptions[0];
        oneElement.innerHTML=this.state.arrayOptions[0].name;
                //this.setState({marketOptionPrice: parseFloat(event.target.value)});




        var threeElement = document.getElementById("example2");
        var string = 'Swaggest';
        for (var i = 0; i < this.arrayOptions.length; i++) {
            string+= this.state.arrayOptions[i];
        }
        threeElement.innerHTML = string;

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
        var arrayNames = [];
        /*

         for (var i = 0; i < this.arrayOptions.length; i++) {
            arrayNames.push(this.state.arrayOptions.name);
        }

        */
        const listOptionNames = arrayNames.map((name) => <li>{name}</li>);

        return listOptionNames;
    }

    renderTable() {

    }
    makeTableFromOptionArray (name, x)
    {
    // Should add a new row for each element in array - for option
    // Should add column for each element in array - for range 0 < X < 50... etc....
    // Will need a function that mutates the table based on number of elements in array
    // table should be scrollable sideways
    /*return (
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
    }*/
    }

    render()
    {
        return (
            <div>
                <form id="add-option-layout">
                      <Input id="option-name" type='select' label="Financial Option">
                        <option value='- select -'> </option>
                        <option value='put'>Put</option>
                        <option value='call'>Call</option>
                      </Input>
                      <Input id="option-action" type='select' label="Action">
                        <option value='- select -'> </option>
                        <option value='short'>Short</option>
                        <option value='long'>Long</option>
                      </Input>
                      <Button id="add-option-btn" waves='light' onClick={this.handleAddOption}>Add Option</Button>
                </form>

                <div id="optional-checkbox">
                    <p> <strong> Optional Diagrams </strong> </p>
                    <Input label="List Of Optinos" type="checkbox" value="table" name="c-option-list" id="c-option-list" />
                    <br />
                    <Input label="Payoff Table" type="checkbox" value="ist" name="c-payoff-table" id="c-payoff-table" />
                    <br />
                </div>

                <div id="option-content">
                    <ul> {this.renderList()} </ul>
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
