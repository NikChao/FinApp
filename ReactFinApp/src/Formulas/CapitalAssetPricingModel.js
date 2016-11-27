import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Button, Icon, Dropdown, Navbar, NavItem, Input } from 'react-materialize';

export default class CapitalAssetPricingModel extends Component
{

    constructor(props)
    {
        super(props);

        // Define State
        this.state =
        {
            beta: "",
            mrp: "",
            rf: ""
        };

        // Binding methods
        this.CapitalAsset = this.CapitalAsset.bind(this);
        this.MktRiskPrem = this.MktRiskPrem.bind(this);
        this.handleBetaChange = this.handleBetaChange.bind(this);
        this.handleRfChange = this.handleRfChange.bind(this);
        this.handleMrpChange = this.handleMrpChange.bind(this);
    }

    MktRiskPrem(returnOnMarket, riskFreeRate)
    {
        return returnOnMarket - riskFreeRate;
    }

    CapitalAsset()
    {
        var _mrp = parseFloat(this.state.mrp);
        var _rf = parseFloat(this.state.rf);
        var _beta = parseFloat(this.state.beta);
        var capm = _rf + _beta * _mrp;

        return capm;
    }

    handleBetaChange(event)
    {
        this.setState({beta: event.target.value});
    }

    handleRfChange(event)
    {
        this.setState({rf: event.target.value});
    }

    handleMrpChange(event)
    {
        this.setState({mrp: event.target.value});
    }

    render()
    {
        return (
            <div>
              <div id="capm">

              </div>
              <div id="wacc"></div>
              <div id="val"></div>
              <h5> Capital Asset Pricing Model </h5>
              <Input label="Risk free rate" value={this.state.value} onChange={this.handleRfChange} />
              <Input label="Market risk premium" value={this.state.value} onChange={this.handleMrpChange} />
              <Input label="Beta" value={this.state.value} onChange={this.handleBetaChange} />
              <p> CAPM = {this.CapitalAsset()} </p>
            </div>
        );
    }
}
