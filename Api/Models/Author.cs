using System.ComponentModel.DataAnnotations;

namespace ProgrammingQuotesApi.Models
{
    public class Author
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [Url]
        [Required]
        public string QuotesUrl { get; set; }
        [Url]
        public string WikiUrl { get; set; }
        public int QuoteCount { get; set; }
    }
}
