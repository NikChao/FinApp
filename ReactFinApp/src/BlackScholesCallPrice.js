import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Button, Icon, Dropdown, Navbar, NavItem, Input } from 'react-materialize';

export default class BlackScholes extends Component
{
    constructor(props)
    {
        super(props);

        //B-S pricing Model State
        this.state =
        {
            S: "", //current stock price
            t: "", //time until option exercise
            K: "", //option strike price
            r: "", //risk free rate
            sigma: "" //standard deviation
        };

        //method binding
        this.normalCdf = this.normalCdf.bind(this);
        this.d1 = this.d1.bind(this);
        this.d2 = this.d2.bind(this);
        this.BlackScholesCallPrice = this.BlackScholesCallPrice.bind(this);

        // eventHandler binding
        this.handleSpotChange = this.handleSpotChange.bind(this);
        this.handleStrikeChange = this.handleStrikeChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleRfChange = this.handleRfChange.bind(this);
        this.handleSigmaChange = this.handleSigmaChange.bind(this);
    }

    BlackScholesCallPrice()
    {
        var _S = parseFloat(this.state.S);
        var _K = parseFloat(this.state.K);
        var _r = parseFloat(this.state.r);
        var _t = parseFloat(this.state.t);

        var CallPremium = _S * this.normalCdf(this.d1()) - this.normalCdf(this.d2()) * _K * Math.pow(Math.E,(-1 * _r * _t));
        return CallPremium;
    }

    normalCdf(X)
    {
        // assumption that mean = 0 and SD = 1 for the normal curve
        var T=1/(1+.2316419*Math.abs(X));
        var D=.3989423*Math.exp(-X*X/2);
        var Prob=D*T*(.3193815+T*(-.3565638+T*(1.781478+T*(-1.821256+T*1.330274))));
        if (X>0) {
            Prob=1-Prob
        }
        return Prob
    }

    d1()
    {
        var _S = parseFloat(this.state.S);
        var _K = parseFloat(this.state.K);
        var _r = parseFloat(this.state.r);
        var _t = parseFloat(this.state.t);
        var _sigma = parseFloat(this.state.sigma);

        return (Math.log(_S / _K) + (_r + (Math.pow(_sigma, 2) / 2)) * _t)/(Math.sqrt(_t) * _sigma);

    }

    d2()
    {
        var _sigma = parseFloat(this.state.sigma);
        var _t = parseFloat(this.state.t);
        return this.d1() - _sigma * Math.sqrt(_t);
    }

    handleSpotChange(event)
    {
        this.setState({S: event.target.value});
    }

    handleTimeChange(event)
    {
        this.setState({t: event.target.value});
    }

    handleStrikeChange(event)
    {
        this.setState({K: event.target.value});
    }

    handleRfChange(event)
    {
        this.setState({r: event.target.value});
    }

    handleSigmaChange(event)
    {
        this.setState({sigma: event.target.value});
    }

    render()
    {
        return (
            <div className="center">
                <h5> Black-Scholes Pricing Model </h5>
                <Input label="Spot price" value={this.state.value} onChange={this.handleSpotChange} />
                <Input label="Strike price" value={this.state.value} onChange={this.handleStrikeChange} />
                <Input label="Variance" value={this.state.value} onChange={this.handleSigmaChange} />
                <Input label="Time to expiry" value={this.state.value} onChange={this.handleTimeChange} />
                <Input label="Risk free rate" value={this.state.value} onChange={this.handleRfChange} />
                <p> Black-Scholes Call Price: {this.BlackScholesCallPrice()} </p>
            </div>
        );
    }
}
