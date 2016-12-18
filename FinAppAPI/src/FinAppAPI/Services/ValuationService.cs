using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinAppAPI.Services.Interfaces;

namespace FinAppAPI.Services
{
    public class ValuationService : IValuationService
    {
        public double Value(double equity, double debt)
            => equity + debt;

        public double Wacc(double equity, double debt, double re, double rd)
            => equity / (equity + debt) * re + debt / (equity + debt) * rd;


        public double ProjectValue()
        {
            throw new NotImplementedException();
        }
    }
}
