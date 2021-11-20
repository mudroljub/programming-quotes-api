using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace ProgrammingQuotesApi.Models
{
    public class Author
    {
        [Key]
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        
        [Url]
        public string WikiUrl { get; set; }

        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public IEnumerable<Quote> Quotes { get; set; }

        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]        
        public int QuoteCount { get; set; }

    }
}
