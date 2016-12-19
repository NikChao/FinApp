using System.Runtime.CompilerServices;

namespace FinAppAPI.Services.Interfaces
{
    public interface ICostOfCapitalService
    {
        //Wacc can be injected from capital structure service if needed
        double Capm(double rf, double beta, double marketReturn);
        double EquityBeta(double assetBeta, double debtBeta, double debt, double equity);
    }
}