using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinAppAPI.Services.Interfaces;

namespace FinAppAPI.Services
{
    public class OptionsService : IOptionsService
    {
        public double D1(double spot, double strike, double riskFree, double stDeviation, double time)
        {
            return (Math.Log(spot/strike, Math.E) + (riskFree + (Math.Pow(stDeviation, 2)/2))*time)/(stDeviation * Math.Sqrt(time));
        }

        public double D2(double d1, double spot, double time)
        {
            return d1 - spot*Math.Sqrt(time);
        }

        public double BlackScholesCall(double spot, double strike, double riskFree, double stDeviation, double time)
        {
            double d1 = D1(spot, strike, riskFree, stDeviation, time);
            double d2 = D2(d1, spot, time);
            double call = spot*N(d1) - N(d2)*strike*Math.Pow(Math.E, -riskFree*time);
            return call;
        }

        public double BlackScholesPut(double spot, double strike, double riskFree, double stDeviation, double time)
        {
            return BlackScholesCall(spot, strike, riskFree, stDeviation,time) + strike*Math.Pow(Math.E, -riskFree*time) - spot;
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
        private static object OverPricedCall => new {}; 
        private static object UnderPricedCall => new {};
        private static object OverPricedPut => new {};
        private static object UnderPricedPut => new {};
        #endregion 

        public object ArbitrageCapture(double expectedPrice, double actualPrice, double riskFree, double strike,
            double spot, bool isCall)
        {
            if (isCall)
            {
                return expectedPrice > actualPrice ? UnderPricedCall : OverPricedCall;
            }
            return expectedPrice > actualPrice ? UnderPricedPut : OverPricedPut;
        }

    }
}
