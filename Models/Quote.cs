using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProgrammingQuotesApi.Models
{
    public class Quote
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Author { get; set; }
        public string En { get; set; }
    }
}
