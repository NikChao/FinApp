using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinAppAPI.Services;
using FinAppAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FinAppAPI.Controllers
{
    [Route("api/[controller]")]
    public class OptionsController : Controller
    {
        #region Fields
        private readonly IOptionsService _optionsService;
        #endregion

        #region Constructor
        public OptionsController()
        {
            _optionsService = new OptionsService();
        }
        #endregion


    }
}
