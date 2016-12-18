using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using FinAppAPI.Services;
using FinAppAPI.Services.Interfaces;

namespace FinAppAPI.Controllers
{
    [Route("api/[controller]")]
    public class WeightedAverageCostOfCapitalController : Controller
    {
        #region Fields
        private readonly IValuationService _valuationService;
        #endregion

        #region Constructor
        public WeightedAverageCostOfCapitalController()
        {
            _valuationService = new ValuationService();
        }
        #endregion

        #region Methods
        [HttpGet]
        public ActionResult Get(int id, double? equity = 1, double? debt = 1, double? re = 1, double? rd = 1)
        {
            var response = new
            {
                Id = id,
                Name = "Wacc",
                WACC = _valuationService.Wacc(equity.GetValueOrDefault(), debt.GetValueOrDefault(), re.GetValueOrDefault(), rd.GetValueOrDefault())
            };

            return Content(JsonConvert.SerializeObject(response, Formatting.Indented, 
                new JsonConverter[] { new StringEnumConverter() }), 
                "application/json");
        }
        #endregion
    }
}
