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
        double NetWorkingCapital(double currentAssets, double currentLiabilities);
        double NetWorkingCapital(double cash, double accountsReceivable, double accountsPayable, double inventories, double bankOverdrafts,
            double taxesPayable);

        double ProjectCashFlowAfterTaxEbit(double ebit, double depreciation, double capex, double tc);
        double ProjectCashFlowAfterTaxNetIncome(double netIncome, double depreciation, double capex, double interestExpense);
        double ProjectEconomicCashFlow(double ebit, double depreciation, double capex, double corporateIncomeTax, double deltaDeferredTax, double deltaNwc);
    }
}
