using System.Text;

namespace ProgrammingQuotesApi.Authorization
{
    public static class Settings
    {
        private static readonly string _Secret = "marcy9d8534b48w951b9287d492b256x";
        public static byte[] Secret = Encoding.ASCII.GetBytes(_Secret);
    }
}