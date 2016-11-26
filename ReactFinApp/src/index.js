import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//React Materialize components
import { Button, Icon, Dropdown, NavItem, Input } from 'react-materialize';

import {
    presentValue,
    futureValue,
    stockToEquity,
    annuityValue,
    perpetuityValue,
    perpetuityCashFlow
} from './generalFunctions.js';

// imported components
import {
	navbar
} from './NavBar.js'



/*
	Each class below represents a different Financial function
	Should probably check all 3401 ones into a 3401 file, 3402 ones into a
	3402 file etc. And then import them and manage page selection here
 */
class CapitalAssetPricingModel extends Component
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
			  <h3> Capital Asset Pricing Model </h3>
			  <p> risk free rate </p><input type="text" value={this.state.value} onChange={this.handleRfChange} />
			  <p> market risk premium </p> <input type="text" value={this.state.value} onChange={this.handleMrpChange} />
			  <p> beta </p> <input type="text" value={this.state.value} onChange={this.handleBetaChange} />
			  <p> CAPM = {this.CapitalAsset()} </p>
			</div>
		);
	}
}

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
			  	<Input placeholder="0" label="Spot price" value={this.state.value} onChange={this.handleSpotChange} />
			  	<Input palceholder="0" label="Strike price" value={this.state.value} onChange={this.handleStrikeChange} />
			  	<Input palceholder="0" label="Variance" value={this.state.value} onChange={this.handleSigmaChange} />
			  	<Input palceholder="0" label="Time to expiry" value={this.state.value} onChange={this.handleTimeChange} />
				<Input palceholder="0" label="Risk free rate" value={this.state.value} onChange={this.handleRfChange} />
				<p> Black-Scholes Call Price: {this.BlackScholesCallPrice()} </p>
			</div>
		);
	}
}

// Might have to split this up into a parent and 2 child classes.
class PutCallParity extends Component
{
	constructor(props)
	{
		super(props);

		// State
		this.state =
		{
			S: "", // spot price
			K: "", // strike price
			C: "", // call price
			P: "", // put price
			r: "", // risk free rate
			t: "", // time to expiry
			result: "", // given result (Either "Call" or "Put")
			resVal: 0,  // result Value
		};

		// Method Binding
		this.getCall = this.getCall.bind(this);
		this.getPut = this.getPut.bind(this);

		// Event Handler Binding
		this.handleCallChange = this.handleCallChange.bind(this);
		this.handlePutChange = this.handlePutChange.bind(this);
	}

	getCall()
	{
		// C + PV(Strike) = P + Spot
		var _P = parseFloat(this.state.P);
		var _K = parseFloat(this.state.K);
		var _S = parseFloat(this.state.S);
		var _r = parseFloat(this.state.r);
		var _t = parseFloat(this.state.t);

		return _P + _S - _K * Math.pow(Math.E, -1 * _r * _t);
	}

	getPut()
	{
		var _C = parseFloat(this.state.C);
		var _K = parseFloat(this.state.K);
		var _S = parseFloat(this.state.S);
		var _r = parseFloat(this.state.r);
		var _t = parseFloat(this.state.t);;

		return _C + _K * Math.pow(Math.E, -1 * _r * _t) - _S;
	}

	handleCallChange(event)
	{
		this.setState({result: "Put", P: this.getPut(), V: this.getPut()}); // set put and set result and value to be put
	}

	handlePutChange(event)
	{
		this.setState({result: "Call", C: this.getCall(), V: this.getCall()}); // set call and set result and value to be call
	}

	render()
	{
		return (
			<div> </div>
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
				<Button flat className="btn btn-primary" onClick={() => this.changeState(<CapitalAssetPricingModel />)}>CAPM</Button>
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

		this.state = {topic: "Topics"};
		// event handler binding
		this.changeState = this.changeState.bind(this);
	}

	changeState(state, topicName)
	{
		changeTopicState(state);
		this.setState({topic: topicName});
	}

	render()
	{

		return (
			<div>
				{navbar()}
				<h3> Finance Type </h3>
				<Dropdown trigger={
					<Button>{this.state.topic}</Button>
				}>
					<NavItem onClick={() => this.changeState(<FinancialManagementStateManager />, 2401)}>2401</NavItem>
					<NavItem onClick={() => this.changeState(<CorpFinanceStateManager />, 3401)}>3401</NavItem>
				</Dropdown>
			</div>
		);
	}
}

ReactDOM.render(
	<MasterStateManager />,
	document.getElementById('masterStatePicker')
);
