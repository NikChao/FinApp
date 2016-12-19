namespace FinAppAPI.Services.Interfaces
{
    public interface ICapitalStructureService
    {
        double Value(double equity, double debt);
        double ValueLevered(double valueUnlevered, double taxRate, double debt);
        double Wacc(double equity, double debt, double re, double rd);
        double Wacc(double equity, double debt, double re, double rd, double taxRate);
        double ReturnOnEquity(double ru, double rd, double d, double e);
        double ReturnOnEquity(double ra, double rd, double d, double e, double taxRate);
    }
}