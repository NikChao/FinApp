using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinAppAPI.Services.Interfaces;

namespace FinAppAPI.Services
{
    public class CapitalStructureService : ICapitalStructureService
    {
        public double Value(double equity, double debt)
            => equity + debt;

        public double ValueLevered(double valueUnlevered, double taxRate, double debt)
            => valueUnlevered + taxRate*debt;

        public double Wacc(double equity, double debt, double re, double rd)
            => equity / (equity + debt) * re + debt / (equity + debt) * rd;

        public double Wacc(double equity, double debt, double re, double rd, double taxRate)
            => equity / (equity + debt) * re + debt / (equity + debt) * rd * (1 - taxRate);

        public double ReturnOnEquity(double ru, double rd, double d, double e)
            => ru + (ru - rd)*(d/e);

        public double ReturnOnEquity(double ra, double rd, double d, double e, double taxRate)
            => ra + (ra - rd)*(1 - taxRate)*(d/e);

    }

}
