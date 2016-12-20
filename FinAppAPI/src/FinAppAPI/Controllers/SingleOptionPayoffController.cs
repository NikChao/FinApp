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
    public class SingleOptionPayoffController : Controller
    {
        #region Fields
        private readonly IOptionService _optionService;
        #endregion

        #region Initialize
        public SingleOptionPayoffController(IOptionService optionService)
        {
            _optionService = optionService;
        }
        #endregion

        #region Methods
        [HttpGet]
        public ActionResult Get(double optionCost = 1, double strike = 1, bool isCall = true, bool isOwned = true)
        {
            var response = new
            {
                Status = "Ok",
                Data = new {
                    OptionPayoffDiagram = _optionService.OptionPayoff(strike, optionCost, isOwned, isCall)
                }
            };

            return Content(JsonConvert.SerializeObject(response,
                Formatting.Indented, new JsonConverter[] { new StringEnumConverter() }),
                "application/json");
        }
        #endregion
    }
}
