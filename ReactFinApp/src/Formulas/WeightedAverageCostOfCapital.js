import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Button, Icon, Dropdown, Navbar, NavItem, Input } from 'react-materialize';

export default class WeightedAverageCostOfCapital extends Component
{
    constructor(props)
    {
        super(props)

        // state
        this.state =
        {
            debt: "",
            equity: "",
            rd: "",
            re: "",
            taxRate: 0
        }

        // method binding
        this.wacc = this.wacc.bind(this);
        this.handleEquityChange = this.handleEquityChange.bind(this);
        this.handleDebtChange = this.handleDebtChange.bind(this);
        this.handleRdChange = this.handleRdChange.bind(this);
        this.handleReChange = this.handleReChange.bind(this);
        this.handleTaxChange = this.handleTaxChange.bind(this);

    }

    wacc()
    {
        var _debt = parseFloat(this.state.debt);
        var _equity = parseFloat(this.state.equity);
        var _value = _equity + _debt;
        var _rd = parseFloat(this.state.rd) / 100;
        var _re = parseFloat(this.state.re) / 100;
        var _tax = parseFloat(this.state.taxRate) / 100;
        var _wacc = (_re * (_equity / _value)) + (_rd * (_debt / _value) * (1 - _tax));
        return Math.round(_wacc * 10000) / 100; //2 decimal places
    }

    handleEquityChange(event)
    {
        this.setState({equity: event.target.value});
    }

    handleDebtChange(event)
    {
        this.setState({debt: event.target.value});
    }

    handleRdChange(event)
    {
        this.setState({rd: event.target.value});
    }

    handleReChange(event)
    {
        this.setState({re: event.target.value});
    }

    handleTaxChange(event)
    {
        this.setState({taxRate: event.target.value});

    }

    render()
    {
        return (
            <div>

              <Input type="text" label="Equity" value={this.state.value} onChange={this.handleEquityChange} />
              <Input type="text" label="Debt" value={this.state.value} onChange={this.handleDebtChange} />
              <Input type="text" label="Return on Equity" value={this.state.value} onChange={this.handleReChange} />
              <Input type="text" label="Return on Debt" value={this.state.value} onChange={this.handleRdChange} />
              <Input type="text" label="Tax Rate" value={this.state.value} onChange={this.handleTaxChange} />

              <p> <h4> Weighted Average Cost of Capital </h4> <br /> Equation: re * (E / V) + rd * (D / V) * (1 - Tax Rate) <br /> Answer: {this.wacc()}%</p>
            </div>
        );
    }
}
