using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinAppAPI.Services.Interfaces
{
    public interface IValuationService
    {
        double NPV(double cashFlow, double interval, double interestRate, int n, double t); //NPV with some interval that's not annual
        double NPV(double cashFlow, double interestRate, int n, int t); //NPV for annual payments
    }
}
