namespace FinAppAPI.Services.Interfaces
{
    public interface IOptionsService
    {
        double D1(double spot, double strike, double riskFree, double stDeviation, double time);
        double D2(double d1, double spot, double time);
        double BlackScholesCall(double spot, double strike, double riskFree, double stDeviation, double time);
        double BlackScholesPut(double spot, double strike, double riskFree, double stDeviation, double time);
        double N(double z);
        object ArbitrageCapture(double expectedCall, double actualCall, double riskFree, double strike, double spot, bool isCall);
    }
}