import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//React Materialize components
import { Row, Button, Icon, Dropdown, Navbar, NavItem, Input } from 'react-materialize';
import PutCallParity from './PutCallParity.js';
import CapitalAssetPricingModel from './capm.js';
import BlackScholes from './BlackScholesCallPrice.js'
import WeightedAverageCostOfCapital from './WeightedAverageCostOfCapital.js'
import BondPrices from './BondPrices.js';

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
			  <Button flat onClick={() => this.changeState(<ProjectValuations/>)}>Valuation</Button>
			  <Button flat onClick={() => this.changeState(<BondPrices/>)}>Bond Prices</Button>

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
