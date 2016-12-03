import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Button, Icon, Dropdown, Navbar, NavItem, Input } from 'react-materialize';

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
            currentArray: ['One', 'Two', 'Three', 'Four'],      // array of names
            name: 'Five',  // conversion ratio
            x: ""     // face value
        };

        // method binding
        this.makeTableFromOptionArray = this.makeTableFromOptionArray.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);

    }

    handleAddOption(event)
    {
        const newArray = this.state.currentArray;
        newArray.add(this.state.name);
        this.setState({name: event.target.value});
        this.setState({currentArray: newArray});
    }

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

    render()
    {
        return (
            <div>
                <div>
                    <p> <strong> Option Form </strong> </p>
                    <Input label="Option"/>
                    <Input label="Exercise Price"/>
                    <Button  waves='light' onClick={this.handleAddOption}>Add Option</Button>
                </div>
                <p> Pay-Off Table <br/>  {this.makeTableFromOptionArray()} </p>
            </div>
        )
    }
}

/*
            <div>
                <Input label="Option" />
                <Input label="Exercise Price" />
                <Button label="Add Option" />
                {this.makeTableFromOptionArray()}

            </div>
 */
