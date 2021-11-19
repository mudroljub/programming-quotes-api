using System.ComponentModel.DataAnnotations;

namespace ProgrammingQuotesApi.Models
{
    public class QuoteNew
    {
        [Required]
        [MaxLength(50)]
        public string Author { get; set; }
        [Required]
        [MinLength(10)]
        [MaxLength(500)]
        public string En { get; set; }
    }
}
