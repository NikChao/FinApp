using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinAppAPI.Services.Interfaces
{
    public class CostOfCapitalService : ICostOfCapitalService
    {
        public double Capm(double rf, double beta, double marketReturn)
            => rf + beta*(marketReturn - rf);

        public double EquityBeta(double assetBeta, double debtBeta, double debt, double equity)
            => assetBeta + (debt/equity)*(assetBeta - debtBeta);
    }
}
