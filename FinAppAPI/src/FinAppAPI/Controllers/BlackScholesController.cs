using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace WebApplication2.Controllers
{
    public class BlackScholesResponse
    {
        public double Call { get; set; }
        public double Put { get; set; }
    }

    [Route("api/[controller]")]
    public class BlackScholesController : Controller
    {
        [HttpGet]
        public ActionResult Get(double? spot = 1, double? strike = 1, double? riskFree = 1, double? stDeviation = 1,
            double? time = 1)
        {
            var response = new BlackScholesResponse
            {
                Call = BlackScholesCall(spot.GetValueOrDefault(), strike.GetValueOrDefault(), riskFree.GetValueOrDefault(), stDeviation.GetValueOrDefault(), time.GetValueOrDefault()),
                Put = BlackScholesPut(spot.GetValueOrDefault(), strike.GetValueOrDefault(), riskFree.GetValueOrDefault(), stDeviation.GetValueOrDefault(), time.GetValueOrDefault())
            };
            
            return Content(JsonConvert.SerializeObject(response, Formatting.Indented, new JsonConverter[] { new StringEnumConverter() }), "application/json");
        }

        #region Methods

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
        #endregion
    }
}
