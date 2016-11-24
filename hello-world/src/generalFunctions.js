/*
    Helper Functions like PV, FV go below
    Should probably chuck them in a separate file
 */
function presentValue(FV, r, t)
{
    return FV * Math.pow(Math.E, -1 * r * t);
}

function futureValue(PV, r, t)
{
    return PV * Math.pow(Math.E, r * t);
}

function stockToEquity(numberOfShares, pricePerShare)
{
    return numberOfShares * pricePerShare;
}

function annuityValue(cashFlow, years, riskFreeRate, growth)
{
    return perpetuityValue(cashFlow, riskFreeRate, growth) * (1 - Math.pow(1/(1 + riskFreeRate), years));
}

function perpetuityValue(cashFlow, riskFreeRate, growth)
{
    return cashFlow / (riskFreeRate - growth);
}

function perpetuityCashFlow(presentValue, riskFreeRate)
{
    return presentValue * riskFreeRate;
}

export {
    presentValue,
    futureValue,
    stockToEquity,
    annuityValue,
    perpetuityValue,
    perpetuityCashFlow
};
