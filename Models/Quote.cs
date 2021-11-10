using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ProgrammingQuotesApi.Models
{
    public class Quote
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public string En { get; set; }
    }
}
