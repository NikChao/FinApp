using System.Collections.Generic;

namespace FinAppAPI.Services.Interfaces
{
    public interface IOptionService
    {
        double D1(double spot, double strike, double riskFree, double stDeviation, double time);
        double D2(double d1, double spot, double time);

        Option OptionPayoff(double strike, double optionCost = 1, bool isOwned=true, bool isCall=true);
        MultipleOptionPayoff MultipleOptionPayoff(IList<Option> options);
        double CallFromPut(double put, double spot, double strike, double interest, double time);
        double PutFromCall(double call, double spot, double strike, double interest, double time);

        double BlackScholesCall(double spot, double strike, double riskFree, double stDeviation, double time);
        double BlackScholesPut(double spot, double strike, double riskFree, double stDeviation, double time);
        double N(double z);
        ArbitrageCapture ArbitrageCapture(double fairPrice, double actualPrice, double riskFree, double strike, double spot, double time, bool isCall);
    }
}