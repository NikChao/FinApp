import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//React Materialize components
import { Row, Button, Icon, Dropdown, Navbar, NavItem, Input } from 'react-materialize';

// Formula Classes
import PutCallParity from './Formulas/PutCallParity.js';
import CapitalAssetPricingModel from './Formulas/CapitalAssetPricingModel.js';
import BlackScholes from './Formulas/BlackScholesCallPrice.js'
import WeightedAverageCostOfCapital from './Formulas/WeightedAverageCostOfCapital.js'
import BondPrices from './Formulas/BondPrices.js';

//Render functions
import {
    changeFunctionState,
    changeTopicState
} from './RenderFunctions.js';

//commonly used functions
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
} from './Formulas/GeneralFunctions.js';

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
	2401 state manager
 */
class FinancialManagementStateManager extends Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
			<div>
				<h4> Financial Management Functions </h4>
				<Button flat onClick={() => changeFunctionState(<CapitalAssetPricingModel />)}>CAPM</Button>
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
	}

	render()
	{
		return (
			<div>
			  <h4> Corporate Finance Functions </h4>
			  <Button flat onClick={() => changeFunctionState(<BlackScholes />)}>B-S Model</Button>
			  <Button flat onClick={() => changeFunctionState(<WeightedAverageCostOfCapital />)}>Wacc</Button>
			  <Button flat onClick={() => changeFunctionState(<CapitalAssetPricingModel />)}>CAPM</Button>
			  <Button flat onClick={() => changeFunctionState(<PutCallParity />)}>Put-Call parity</Button>
			  <Button flat onClick={() => changeFunctionState(<ProjectValuations/>)}>Valuation</Button>
			  <Button flat onClick={() => changeFunctionState(<BondPrices/>)}>Bond Prices</Button>
			</div>
		);
	}
}


/*
	3405
 */
class DerivRiskMgmtStateManager extends Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		return (
			<div>
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
	}

	render()
	{
		return (
			<div>
				<Navbar brand='FinApp' right>
					<NavItem onClick={() => changeTopicState(<FinancialManagementStateManager />)}> 2401 </NavItem>
					<NavItem onClick={() => changeTopicState(<CorpFinanceStateManager />)}> 3401 </NavItem>
					<NavItem onClick={() => changeTopicState(<CorpFinanceStateManager />)}> 3402 </NavItem>
					<NavItem onClick={() => changeTopicState(<CorpFinanceStateManager />)}> 3403 </NavItem>
					<NavItem onClick={() => changeTopicState(<CorpFinanceStateManager />)}> 3404 </NavItem>
					<NavItem onClick={() => changeTopicState(<CorpFinanceStateManager />)}> 3405 </NavItem>
				</Navbar>
			</div>
		);
	}
}

ReactDOM.render(
	<MasterStateManager />,
	document.getElementById('masterStatePicker')
);
