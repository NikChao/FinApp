import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Row, Button, Icon, Dropdown, Navbar, NavItem, Input } from 'react-materialize';
import { getPut } from './GeneralFunctions.js';

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
            sigma: "", //standard deviation
            arbitrage: false,
            marketOptionPrice: 0
        };

        //method binding
        this.normalCdf = this.normalCdf.bind(this);
        this.d1 = this.d1.bind(this);
        this.d2 = this.d2.bind(this);
        this.BlackScholesCallPrice = this.BlackScholesCallPrice.bind(this);
        this.renderArbitrageBody = this.renderArbitrageBody.bind(this);
        this.renderArbitrageDecision = this.renderArbitrageDecision.bind(this);
        this.getPut = this.getPut.bind(this);
        // eventHandler binding
        this.handleSpotChange = this.handleSpotChange.bind(this);
        this.handleStrikeChange = this.handleStrikeChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleRfChange = this.handleRfChange.bind(this);
        this.handleSigmaChange = this.handleSigmaChange.bind(this);
        this.handleMktCallChange = this.handleMktCallChange.bind(this);
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

    handleMktCallChange(event)
    {
        this.setState({marketOptionPrice: parseFloat(event.target.value)});
    }

    getPut()
    {
        return Math.max(this.BlackScholesCallPrice() + parseFloat(this.state.K)/Math.pow(1+parseFloat(this.state.r),parseFloat(this.state.t)) - parseFloat(this.state.S),0)
    }

    renderArbitrageDecision()
    {
        if(this.BlackScholesCallPrice() - this.state.marketOptionPrice > 0)
        {
            return (
                <div>
                    <p> underpriced </p>
                    <Table>
                        <thead>
                            <tr>
                            <th data-field="id">Position</th>
                            <th data-field="t0"> t=0 </th>
                            <th data-field="name">t=T, X > S</th>
                            <th data-field="price">t=T, S > X</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                            <td>Buy Call</td>
                            <td>{-this.state.marketOptionPrice}</td>
                            <td>0</td>
                            <td>St - X</td>
                            </tr>
                            <tr>
                            <td>Sell Put</td>
                            <td> {this.getPut()} </td>
                            <td>St - X</td>
                            <td>0</td>
                            </tr>
                            <tr>
                            <td> Invest PV(X) </td>
                            <td> {-parseFloat(this.state.K)/Math.pow((1 + parseFloat(this.state.r)),parseFloat(this.state.t))} </td>
                            <td>{this.state.K} (+X)</td>
                            <td>{this.state.K} (+X)</td>
                            </tr>
                            <tr>
                            <td>Short Sell Stock</td>
                            <td>{this.state.S}</td>
                            <td>-St</td>
                            <td>-St</td>
                            </tr>
                            <tr>
                            <td>Total</td>
                            <td>{-this.state.marketOptionPrice + this.getPut() + parseFloat(this.state.S) -parseFloat(this.state.K)/Math.pow((1 + parseFloat(this.state.r)),parseFloat(this.state.t)) }</td>
                            <td>0</td>
                            <td>0</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            );
        } else if(this.BlackScholesCallPrice() - this.state.marketOptionPrice < 0){
            return (
                <div>
                <p> overpriced </p>
                {this.renderArbitrageDecision()}
                </div>
            );
        } else {
            return (<p> No Arbitrage </p>);
        }
    }

    renderArbitrageBody()
    {
        if(this.state.arbitrage == true)
        {
            return (
                <div>
                    <Input label="Market Call Price" value={this.state.value} onChange={this.handleMktCallChange} />
                    {this.renderArbitrageDecision()}
                </div>
            );
        } else {
            return (
                <div></div> // Empty Div, they don't want to find arbitrage
            );
        }

    }

    render()
    {
        return (
            <div className="center">
                <Input label="Spot price" value={this.state.value} onChange={this.handleSpotChange} />
                <Input label="Strike price" value={this.state.value} onChange={this.handleStrikeChange} />
                <Input label="Variance" value={this.state.value} onChange={this.handleSigmaChange} />
                <Input label="Time to expiry" value={this.state.value} onChange={this.handleTimeChange} />
                <Input label="Risk free rate" value={this.state.value} onChange={this.handleRfChange} />
                <p> Black-Scholes Call Price: {this.BlackScholesCallPrice()} </p>
                <br></br>
                <p> Arbitrage? </p>
                <Row>
                  <Input name='on' type='switch' value='1' onChange={() => this.setState({arbitrage: !this.state.arbitrage})}/>
                </Row>
                {this.renderArbitrageBody()}
            </div>
        );
    }
}
