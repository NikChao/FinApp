using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace WebApplication2.Controllers
{
    public class WaccResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal WACC { get; set; }
    }

    [Route("api/[controller]")]
    public class WeightedAverageCostOfCapitalController : Controller
    {
        [HttpGet]
        public ActionResult Get(int id, decimal? equity = 1, decimal? debt = 1, decimal? re = 1, decimal? rd = 1)
        {
            var response = new WaccResponse
            {
                Id = id,
                Name = "Wacc",
                WACC = WeightedAverageCostOfCapital(equity.GetValueOrDefault(), debt.GetValueOrDefault(), re.GetValueOrDefault(), rd.GetValueOrDefault())
            };

            return Content(JsonConvert.SerializeObject(response, Formatting.Indented, new JsonConverter[] { new StringEnumConverter() }), "application/json");
        }

        #region Calculations

        public decimal WeightedAverageCostOfCapital(decimal equity, decimal debt, decimal re, decimal rd)
        {
            return equity/(equity + debt)*re + debt/(equity + debt)*rd;
        }
        #endregion
    }
}
