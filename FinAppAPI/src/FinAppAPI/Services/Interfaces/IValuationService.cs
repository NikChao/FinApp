namespace FinAppAPI.Services.Interfaces
{
    public interface IValuationService
    {
        double Value(double equity, double debt);
        double Wacc(double equity, double debt, double re, double rd);
        double ProjectValue();
    }
}