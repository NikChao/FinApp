import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import {
    presentValue,
    futureValue,
    stockToEquity,
    annuityValue,
    perpetuityValue,
    perpetuityCashFlow
} from './generalFunctions.js';

import './index.css';

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

		if (capm == NaN)
		{
			return "Bad input in field";
		} else {
			return capm;
		}

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
			  <h3> wacc </h3>
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
		this.handleStockChange = this.handleStockChange.bind(this);
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
		var _S = parseFloat(this.state.s);
		var _K = parseFloat(this.state.k);
		var _r = parseFloat(this.state.r);
		var _t = parseFloat(this.state.t);
		var _s = parseFloat(this.state.s);

		return (Math.log(_S / _K) + (_r + (Math.pow(_s, 2) / 2)) * _t)/(Math.sqrt(_t) * _s);
	}

	d2()
	{
		var _sigma = parseFloat(this.state.sigma);
		var _t = parseFloat(this.state.t);
		return this.d1() - _sigma * Math.sqrt(_t);
	}

	handleStockChange(event)
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
			<div>
				<h3> Black Scholes Pricing Model </h3>
				<p>  </p>
				{/*
					Make users input values here
				*/}
				{/*
					Output d1, d2 and B-S Call Price
				*/}
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

function manageState(state)
{
	ReactDOM.render(
  		state,
  		document.getElementById('root')
	);
}

class StateManager extends Component
{
	constructor(props)
	{
		super(props);
		this.changeState = this.changeState.bind(this);
	}

	changeState(state)
	{
		manageState(state);
	}

	render()
	{
		return (
			<div>
			  <p> pick one </p>
			  <button onClick={() => this.changeState(<BlackScholes />)}>B-S Model</button>
			  <button onClick={() => this.changeState(<WeightedAverageCostOfCapital />)}>Wacc</button>
			  <button onClick={() => this.changeState(<CapitalAssetPricingModel />)}>CAPM</button>
			</div>
		);
	}
}

ReactDOM.render(
	<StateManager />,
	document.getElementById('statePicker')
);
