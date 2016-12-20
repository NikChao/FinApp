using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinAppAPI.Services;
using FinAppAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace FinAppAPI.Controllers
{
    [Route("api/[controller]")]
    public class ArbitrageController : Controller
    {
        #region Fields
        private readonly IOptionService _optionService;
        #endregion

        #region Initialize
        public ArbitrageController(IOptionService optionService)
        {
            _optionService = optionService;
        }
        #endregion

        #region Methods
        [HttpGet]
        public ActionResult Get(double fairPrice = 1, double actualPrice = 1, double riskFree = 1, 
            double strike = 1, double spot = 1, double time = 1, bool isCall = true)
        {
            var response = new
            {
                Status = "Ok",
                Data = _optionService.ArbitrageCapture(fairPrice, actualPrice, riskFree, strike, spot, time, isCall)
            };

            return Content(JsonConvert.SerializeObject(response, Formatting.Indented, 
                new JsonConverter[] { new StringEnumConverter() }), "application/json");
        }
        #endregion
    }
}
