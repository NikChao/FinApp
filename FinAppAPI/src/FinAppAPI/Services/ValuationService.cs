using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinAppAPI.Services.Interfaces;

namespace FinAppAPI.Services
{
    public class Project
    {
        public IList<ProjectComponent> Components;
        public double NPV => Components.Sum(c => c.NPV);
    }

    public class ProjectComponent
    {
        #region Fields
        private readonly IValuationService _valuationService;
        #endregion

        #region Initialize
        public ProjectComponent()
        {
            _valuationService = new ValuationService(); //TODO: make this dependency injection
        }
        #endregion

        #region Attributes
        public double CashFlow { get; set; }
        public double InterestRate { get; set; }
        public double? Interval { get; set; }
        public int NumberOfPayments { get; set; }

        public double NPV => _valuationService.NPV(CashFlow, Interval ?? 1, InterestRate, NumberOfPayments, 0);
        #endregion
    }
    public class ValuationService : IValuationService
    {
        #region Methods
        public double NPV(double cashFlow, double interestRate, int n, int t = 0)
            => n <= 1
                ? cashFlow/Math.Pow(1 + interestRate, t)
                : cashFlow/Math.Pow(1 + interestRate, t) + NPV(cashFlow, interestRate, n - 1, t + 1);

        /*
         * Usage: interval is a fraction discribing how many years is in between each payment
         * i.e. semi-annual = 0.5
         */
        public double NPV(double cashFlow, double interval, double interestRate, int n, double t = 0)
            => n <= 1
                ? cashFlow / Math.Pow(1 + interestRate, t)
                : cashFlow / Math.Pow(1 + interestRate, t) + NPV(cashFlow, interval, interestRate, n - 1, t + interval);
        #endregion
    }
}
