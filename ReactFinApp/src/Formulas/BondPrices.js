import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Row, Button, Icon, Dropdown, Navbar, NavItem, Input } from 'react-materialize';

export default class BondPrices extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            bondPrice: "", // stock price
            div: "", // dividends
            rf: "" // risk free rate
        };

        this.BondPrice = this.BondPrice.bind(this);

        this.handleBPChange = this.handleBPChange.bind(this);
        this.handleDivChange = this.handleDivChange.bind(this);
        this.handleRfChange = this.handleRfChange.bind(this);
    }

    BondPrice()
    {
        var _bp = parseFloat(this.state.bondPrice);
        var _div = parseFloat(this.state.div);
        var _rf = parseFloat(this.state.rf);

        return (_bp + _div)/_rf;
    }

    handleBPChange(event){
        this.setState({bondPrice: event.target.value});
    }

    handleDivChange(event){
        this.setState({div: event.target.value});
    }

    handleRfChange(event){
        this.setState({rf: event.target.value});
    }


    render()
    {
        return(
            <div>
                <Input label="Bond Price" value={this.state.value} onChange={this.handleBPChange} />
                <Input label="Dividend" value={this.state.value} onChange={this.handleDivChange} />
                <Input label="Risk Free Rate" value={this.state.value} onChange={this.handleRfChange} />
                <p> BondPrice: {this.BondPrice()} </p>
            </div>
        );
    }
}
