import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Row, Button, Icon, Dropdown, Navbar, NavItem, Input } from 'react-materialize';


export default class ConvertibleBonds extends Component
{
    constructor(props)
    {
        super(props)
        this.state =
        {
            ratio: "",  // conversion ratio
            fv: "",     // face value
            sp: "",     // stock price
            cp: ""      // conversion price
        };

        this.handleRatioChange = this.handleRatioChange.bind(this);
        this.handleFvChange = this.handleFvChange.bind(this);
        this.handleSpChange = this.handleSpChange.bind(this);
        this.ConversionPrice = this.ConversionPrice.bind(this);
        this.ConversionPremium = this.ConversionPremium.bind(this);

    }

    handleRatioChange(event){
        this.setState({ratio: event.target.value});
    }

    handleFvChange(event){
        this.setState({fv: event.target.value});
    }

    handleSpChange(event){
        this.setState({sp: event.target.value});
    }

    ConversionPrice()
    {
        var _fv = parseFloat(this.state.fv);
        var _ratio = parseFloat(this.state.ratio);
        var _cp = _fv / _ratio;
        this.setState({cp: _cp});
        return _cp;

    }

    ConversionPremium()
    {
        var _cp = parseFloat(this.state.cp);
        var _sp = parseFloat(this.state.sp);
        var _premium = (_cp - _sp) / _sp;
        this.setState({premium: _premium});
        return _premium;
    }

    render()
    {
        return(
            <div>
                <h3> Convertible Bonds </h3>
                <Input label="Conversion Ratio" value={this.state.value} onChange={this.handleRatioChange} />
                <Input label="Face Value of Bond" value={this.state.value} onChange={this.handleFvChange} />
                <Input label="Stock Price" value={this.state.value} onChange={this.handleSpChange} />

                <h4> Conversion Premium </h4>
                <p> Conversion Premium: {this.ConversionPremium()} </p>

                <h4> Conversion Price </h4>
                <p> Conversion Price: {this.ConversionPrice()} </p>
            </div>
        )
    }
}
