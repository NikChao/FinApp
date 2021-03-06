﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using FinAppAPI.Services;
using FinAppAPI.Services.Interfaces;

namespace FinAppAPI.Controllers
{
    [Route("api/[controller]")]
    public class BlackScholesController : Controller
    {
        #region Fields
        private readonly IOptionService _optionService;
        #endregion

        #region Initialization
        public BlackScholesController(IOptionService optionService)
        {
            _optionService = optionService;
        }
        #endregion

        #region Methods
        [HttpGet]
        public ActionResult Get(double? spot = 1, double? strike = 1, double? riskFree = 1, double? stDeviation = 1,
            double? time = 1)
        {
            var response = new
            {
                OptionPrices = new
                {
                    Call = _optionService.BlackScholesCall(spot.GetValueOrDefault(), strike.GetValueOrDefault(), riskFree.GetValueOrDefault(), stDeviation.GetValueOrDefault(), time.GetValueOrDefault()),
                    Put = _optionService.BlackScholesPut(spot.GetValueOrDefault(), strike.GetValueOrDefault(), riskFree.GetValueOrDefault(), stDeviation.GetValueOrDefault(), time.GetValueOrDefault())
                },
                Status = "Ok"
            };

            return Content(JsonConvert.SerializeObject(response,
                Formatting.Indented, new JsonConverter[] { new StringEnumConverter() }),
                "application/json");
        }
        #endregion
    }
}
