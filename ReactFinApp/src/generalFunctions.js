/*
    Helper Functions like PV, FV go below
    Should probably chuck them in a separate file
 */

 /*
    Computing value of cash flows
 */
function pv(FV, r, t)
{
    return FV * Math.pow(Math.E, -1 * r * t);
}

function fv(PV, r, t)
{
    return PV * Math.pow(Math.E, r * t);
}

function stockToEquity(numberOfShares, pricePerShare)
{
    return numberOfShares * pricePerShare;
}

function annuityValue(cashFlow, years, riskFreeRate, growth)
{
    return (cashFlow / riskFreeRate) * (1 - 1 / Math.pow(1 + riskFreeRate, years));
}

function annuityValueGrowth(cashFlow, riskFreeRate, growth, years)
{
    return (cashFlow / (riskFreeRate - growth)) * (1 - Math.pow((1 + growth) / (1 + riskFreeRate), years));
}

function perpetuityValue(cashFlow, riskFreeRate)
{
    return (cashFlow / riskFreeRate);
}
function perpetuityValueGrowth(cashFlow, riskFreeRate, growth)
{
    return cashFlow / (riskFreeRate - growth);
}

function perpetuityCashFlow(presentValue, riskFreeRate)
{
    return presentValue * riskFreeRate;
}

/*
    Computing interest tax shields and value of firms
*/
function pvInterestTaxShield(taxableExpense, corporateTaxRate)
{
    return taxableExpense * corporateTaxRate;
}

function pvExpectedFinancialDistrressCost(probabilityFinancialDistress, financialDistressCost)
{
    return probabilityFinancialDistress * financialDistressCost;
}

function valueLeveredFirm(valueUnleveredFirm, pvInterestTaxShield, pvExpectedFinancialDistressCost)
{
    return valueUnleveredFirm + pvInterestTaxShield + pvExpectedFinancialDistressCost;
}

function valueUnleveredFirm(numberOfShares, pricePerShare)
{
    return stockToEquity(numberOfShares, pricePerShare);
}

function interestTaxShield(valueLeveredFirm, valueUnleveredFirm)
{
    return valueLeveredFirm - valueUnleveredFirm;
}

/*
    Computing components of CAPM
*/
function mrp(expectedReturnOnMarket, rf)
{
    return expectedReturnOnMarket - rf;
}

function mrpAvgHistoricalDifference(avgReturnOnMarket, avgRf)
{
    return avgReturnOnMarket, avgRf;
}

function mrpFromStock(stockPrice, dividend, growth, rf) {
    var returnOnMarket = dividend / stockPrice + growth;
    return returnOnMarket - rf;
}

function firmBetaFromCovariance(covarianceFirmMarket, varianceMarket)
{
    return covarianceFirmMarket / varianceMarket;
}

function firmBetaFromCapm(expectedReturn, rf, mrp)
{
    return (expectedReturn - rf) / mrp;
}

/*
    Compute price of bond
*/

function bondPriceWithNoDefault(interest, principal, ytm, years)
{
    return (interest + principal) / Math.pow((1 + ytm), years);
}

function bondPriceWithDefault(expectedCashFlow, ytm, years)
{
    return expectedCashFlow / Math.pow((1 + ytm, years));
}

/*
    Valuations
*/

function ebitda(salesRevenue, operatingCost)
{
    return salesRevenue - operatingCost;
}

function ebit(ebitda, depreciationAndAmortisation)
{
    return ebitda - depreciationAndAmortisation;
}

function netIncome(ebit, tax, interestExpense)
{
    return ebit - tax - interestExpense;
}

function firmFCF(netIncome, depreciationAndAmortisation,
        increaseCapitalExpenditure, increaseNetWorkingCapital, gainOnAsset)
{
    return netIncome + depreciationAndAmortisation - increaseCapitalExpenditure -
    increaseNetWorkingCapital + gainOnAsset;
}

function netWorkingCapital(currentAsset, currentLiability)
{
    return currentAsset - currentLiability
}

function increaseNWC(previousNWC, currentNWC)
{
    return currentNWC - previousNWC;
}


export {
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
};
