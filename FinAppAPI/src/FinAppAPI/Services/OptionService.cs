using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinAppAPI.Services.Interfaces;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace FinAppAPI.Services
{
    #region Helper Classes
    public class Slope
    {
        public double m { get; set; }
        public double c { get; set; }
    }

    public class MultipleOptionPayoff
    {
        public IEnumerable<Option> Options { get; set; }
    }

    public class Option
    {
        public double Strike { get; set; }
        public double Cost { get; set; }
        public string OptionType { get; set; }
    }

    public class ArbitrageCapture
    {
        public object TimeZero { get; set; }
        public object MaturityStrikeMoreThanSpot { get; set; }
        public object MaturitySpotMoreThanStrike { get; set; }
    }
    #endregion

    public class OptionService : IOptionService
    {
        public double D1(double spot, double strike, double riskFree, double stDeviation, double time)
            => (Math.Log(spot / strike, Math.E) + (riskFree + (Math.Pow(stDeviation, 2) / 2)) * time) / (stDeviation * Math.Sqrt(time));

        public double D2(double d1, double spot, double time)
            => d1 - spot * Math.Sqrt(time);

        public Option OptionPayoff(double strike, double optionCost = 1, bool isOwned = true, bool isCall = true)
            => new Option { Strike = strike, Cost = optionCost, OptionType = isCall ? "Call" : "Put" };

        public MultipleOptionPayoff MultipleOptionPayoff(IList<Option> options)
            => new MultipleOptionPayoff();

        public double CallFromPut(double put, double spot, double strike, double interest, double time)
            => put + spot - strike*Math.Pow(1 + interest, -time);

        public double PutFromCall(double call, double spot, double strike, double interest, double time)
            => call - spot + strike*Math.Pow(1 + interest, -time);


        public double BlackScholesCall(double spot, double strike, double riskFree, double stDeviation, double time)
        {
            double d1 = D1(spot, strike, riskFree, stDeviation, time);
            double d2 = D2(d1, spot, time);
            double call = spot * N(d1) - N(d2) * strike * Math.Pow(Math.E, -riskFree * time);
            return call;
        }

        public double BlackScholesPut(double spot, double strike, double riskFree, double stDeviation, double time)
        {
            return BlackScholesCall(spot, strike, riskFree, stDeviation, time) + strike * Math.Pow(Math.E, -riskFree * time) - spot;
        }

        public double N(double z)
        {
            double p = 0.3275911;
            double a1 = 0.254829592;
            double a2 = -0.284496736;
            double a3 = 1.421413741;
            double a4 = -1.453152027;
            double a5 = 1.061405429;

            int sign;
            if (z < 0.0)
                sign = -1;
            else
                sign = 1;

            double x = Math.Abs(z) / Math.Sqrt(2.0);
            double t = 1.0 / (1.0 + p * x);
            double erf = 1.0 - (((((a5 * t + a4) * t) + a3)
              * t + a2) * t + a1) * t * Math.Exp(-x * x);
            return 0.5 * (1.0 + sign * erf);
        }

        #region Arbitrage Capture PlaceHolders
        private static ArbitrageCapture OverPricedCall(double fairPrice, double actualPrice, double riskFree, double strike, double spot, bool isCall) => new ArbitrageCapture { };

        private static ArbitrageCapture UnderPricedCall(double fairPrice, double actualPrice, double interest,
            double strike, double spot, double time)
        {
            var capture = new ArbitrageCapture
            {
                TimeZero = new
                {
                    BuyCall = -actualPrice,
                    SellPut = fairPrice - spot + strike*Math.Pow(1 + interest, -time),
                    ShortSellStock = spot,
                    BuyTbill = -strike*Math.Pow(1 + interest, -(double) time),
                    NetPosition =
                    -actualPrice + spot + fairPrice - spot + strike*Math.Pow(1 + interest, -time) -
                    strike*Math.Pow(1 + interest, -time)
                }
            };
            return capture;
        }

        private static ArbitrageCapture OverPricedPut(double fairPrice, double actualPrice, double riskFree, double strike, double spot, bool isCall) => new ArbitrageCapture { };
        private static ArbitrageCapture UnderPricedPut(double fairPrice, double actualPrice, double riskFree, double strike, double spot, bool isCall) => new ArbitrageCapture { };
        #endregion 

        public ArbitrageCapture ArbitrageCapture(double fairPrice, double actualPrice, double riskFree, double strike, double spot, double time, bool isCall)
        {
            if (isCall)
            {
                return fairPrice > actualPrice ? UnderPricedCall(fairPrice, actualPrice, riskFree, strike, spot, time) 
                    : OverPricedCall(fairPrice, actualPrice, riskFree, strike, spot, true);
            }
            return fairPrice > actualPrice ? UnderPricedPut(fairPrice, actualPrice, riskFree, strike, spot, false)
                : OverPricedPut(fairPrice, actualPrice, riskFree, strike, spot, false);
        }

    }

}
