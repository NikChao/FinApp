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
    public class MultiOptionPayoffController : Controller
    {
        #region Fields
        private readonly IOptionService _optionService;
        #endregion

        #region Initialize
        public MultiOptionPayoffController(IOptionService optionService)
        {
            _optionService = optionService;
        }
        #endregion

        #region Methods
        [HttpGet]
        public ActionResult Get(IList<Option> options)
        {
            var response = new
            {
                Status = "Ok",
                Data = _optionService.MultipleOptionPayoff(options)
            };

            return Content(JsonConvert.SerializeObject(response,
                Formatting.Indented, new JsonConverter[] { new StringEnumConverter() }),
                "application/json");
        }
        #endregion
    }
}
