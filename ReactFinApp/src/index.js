import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//React Materialize components
import { Row, Button, Icon, Dropdown, Navbar, NavItem, Input } from 'react-materialize';
import PutCallParity from './PutCallParity.js';
import CapitalAssetPricingModel from './capm.js';

import {
    presentValue,
    futureValue,
    stockToEquity,
    annuityValue,
    perpetuityValue,
    perpetuityCashFlow
} from './generalFunctions.js';

/*
	Each class below represents a different Financial function
	Should probably check all 3401 ones into a 3401 file, 3402 ones into a
	3402 file etc. And then import them and manage page selection here
 */

class WeightedAverageCostOfCapital extends Component
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
			re: ""
		}

		// method binding
		this.wacc = this.wacc.bind(this);
		this.handleEquityChange = this.handleEquityChange.bind(this);
		this.handleDebtChange = this.handleDebtChange.bind(this);
		this.handleRdChange = this.handleRdChange.bind(this);
		this.handleReChange = this.handleReChange.bind(this);
	}


	wacc()
	{
		var _debt = parseFloat(this.state.debt);
		var _equity = parseFloat(this.state.equity);
		var _value = _equity + _debt;
		var _rd = parseFloat(this.state.rd);
		var _re = parseFloat(this.state.re);
		var _wacc = (_re*(_equity/_value)) + (_rd*(_debt/_value));
		return Math.round(_wacc * 10000)/100;
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

	render()
	{
		return (
			<div>
			  <h3> Weighted Average Cost of Capital </h3>
			  <p> Equity </p><input type="text" value={this.state.value} onChange={this.handleEquityChange} />
			  <p> Debt </p> <input type="text" value={this.state.value} onChange={this.handleDebtChange} />
			  <p> Return on Equity </p> <input type="text" value={this.state.value} onChange={this.handleReChange} />
			  <p> Return on Debt </p> <input type="text" value={this.state.value} onChange={this.handleRdChange} />
			  <p> Weighted Average Cost of Capital: {this.wacc()}%</p>
			</div>
		);
	}
}

class BlackScholes extends Component
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

// Project class to be used by ProjectEvaluation class
// Most likely scenario is complex projects have to be broken down into many of these
class Project
{
	constructor(cashFlows, costs)
	{
		this.cashFlows = cashFlows;
		this.costs = costs;
	}

	projectValue()
	{
		return 0;
	}
}

/*
	This is going to be a tricky class to write
	It's going to evaluate projects based on costs, and cash flows (not necessarily stable)
 */
class ProjectEvaluation extends Component
{
	constructor(props)
	{
		super(props)

		// State
		this.state =
		{

		};

		// Method binding

		// event handler binding
	}

	render()
	{
		return (
			<div></div>
		);
	}
}

/*
	Changes which topic goes in the topic div and clears the function div
 */
function changeTopicState(state)
{
	ReactDOM.render(
		state,
		document.getElementById('topic'));
	ReactDOM.render(
		<div></div>,
		document.getElementById('function')
		);
}

/*
	Changes which function goes into the function div
 */
function changeFunctionState(state)
{
	ReactDOM.render(
  		state,
  		document.getElementById('function')
	);
}

/*
	2401 state manager
 */
class FinancialManagementStateManager extends Component
{
	constructor(props)
	{
		super(props);
		this.changeState = this.changeState.bind(this);
	}

	changeState(state)
	{
		changeFunctionState(state);
	}

	render()
	{
		return (
			<div>
				<h4> Financial Management Functions </h4>
				<Button flat onClick={() => this.changeState(<CapitalAssetPricingModel />)}>CAPM</Button>
			</div>
		);
	}
}

/*
	3401
 */
class CorpFinanceStateManager extends Component
{
	constructor(props)
	{
		super(props);
		this.changeState = this.changeState.bind(this);
	}

	changeState(state)
	{
		changeFunctionState(state);
	}

	render()
	{
		return (
			<div>
			  <h4> Corporate Finance Functions </h4>
			  <Button flat onClick={() => this.changeState(<BlackScholes />)}>B-S Model</Button>
			  <Button flat onClick={() => this.changeState(<WeightedAverageCostOfCapital />)}>Wacc</Button>
			  <Button flat onClick={() => this.changeState(<CapitalAssetPricingModel />)}>CAPM</Button>
			  <Button flat onClick={() => this.changeState(<PutCallParity />)}>Put-Call parity</Button>
			</div>
		);
	}
}



/*
	This class will tell the app which finance topic will go in the function state picker
 */
class MasterStateManager extends Component
{
	constructor(props)
	{
		super(props);

		// event handler binding
		this.changeState = this.changeState.bind(this);
	}

	changeState(state, topicName)
	{
		changeTopicState(state);
	}

	render()
	{

		return (
			<div>
				<Navbar brand='FinApp' right>
					<NavItem onClick={() => this.changeState(<FinancialManagementStateManager />, 2401)}> 2401 </NavItem>
					<NavItem onClick={() => this.changeState(<CorpFinanceStateManager />, 3401)}> 3401 </NavItem>
				</Navbar>
			</div>
		);
	}
}

ReactDOM.render(
	<MasterStateManager />,
	document.getElementById('masterStatePicker')
);
