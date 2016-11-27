import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//React Materialize components
import { Row, Button, Icon, Dropdown, Navbar, NavItem, Input } from 'react-materialize';
import PutCallParity from './PutCallParity.js';
import CapitalAssetPricingModel from './capm.js';
import BlackScholes from './BlackScholesCallPrice.js'

import {
    pv,
    fv,
    stockToEquity,
    annuityValue,
    annuityValueGrowth,
    perpetuityValue,
    perpetuityValueGrowth,
    perpetuityCashFlow,
    pvInterestTaxShield,
    pvExpectedFinancialDistrressCost,
    valueLeveredFirm,
    valueUnleveredFirm,
    interestTaxShield,
    mrp,
    mrpAvgHistoricalDifference,
    mrpFromStock,
    firmBetaFromCovariance,
    firmBetaFromCapm,
    bondPriceWithNoDefault,
    bondPriceWithDefault,
    ebitda,
    ebit,
    netIncome,
    firmFCF,
    netWorkingCapital,
    increaseNWC
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
		var _rd = parseFloat(this.state.rd)/100;
		var _re = parseFloat(this.state.re)/100;
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
			  <p> Return on Equity (%) </p> <input type="text" value={this.state.value} onChange={this.handleReChange} />
			  <p> Return on Debt (%) </p> <input type="text" value={this.state.value} onChange={this.handleRdChange} />
			  <p> Weighted Average Cost of Capital: {this.wacc()}%</p>
			</div>
		);
	}
}

class ConvertibleBonds extends Component
{
	constructor(props)
	{
		super(props)
		this.state =
		{
			ratio: "",	// conversion ratio
			fv: "",		// face value
			sp: "",		// stock price
			cp: ""		// conversion price
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

class BondPrices extends Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			principal: "", 	// principal
			int: "", 		//  interest
			rf: "" 		// risk free rate
		};

		this.BondPrice = this.BondPrice.bind(this);

		this.handlePrincipalChange = this.handlePrincipalChange.bind(this);
		this.handleInterestChange = this.handleInterestChange.bind(this);
		this.handleRfChange = this.handleRfChange.bind(this);
	}

	BondPrice()
	{
		var _bp = parseFloat(this.state.principal);
		var _int = parseFloat(this.state.int);
		var _rf = parseFloat(this.state.rf);
		return (_bp + _int)/_rf;
	}

	handlePrincipalChange(event){
		this.setState({principal: event.target.value});
	}

	handleInterestChange(event){
		this.setState({int: event.target.value});
	}

	handleRfChange(event){
		this.setState({rf: event.target.value});
	}


	render()
	{
		return(
			<div>
				<Input label="Principal" value={this.state.value} onChange={this.handlePrincipalChange} />
				<Input label="Interest" value={this.state.value} onChange={this.handleInterestChange} />
				<Input label="Risk Free Rate" value={this.state.value} onChange={this.handleRfChange} />
				<p> BondPrice: {this.BondPrice()} </p>
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
class ProjectEvaluations extends Component
{
	constructor(props)
	{
		super(props)

		// State
		this.state =
		{
			dur: "" 	// project duration
		};

		// Method binding
		this.handleDurChange = this.handleDurChange.bind(this);


		// event handler binding
	}
	handleDurChange() {

	}


	render()
	{
		return (
			<div>
				<h3> Project Evaluations </h3>
				<Input label="Project Duration" value={this.state.value} onChange={this.handleBPChange} />
				<p> Evaluation Sheet </p>
			</div>
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
			  <Button flat onClick={() => this.changeState(<ProjectEvaluations/>)}>Evaluations</Button>
			  <Button flat onClick={() => this.changeState(<BondPrices/>)}>Bond Prices</Button>
			  <Button flat onClick={() => this.changeState(<ConvertibleBonds/>)}>Convertible Bonds</Button>


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
