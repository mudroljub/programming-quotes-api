using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProgrammingQuotesApi.Models
{
    public class Quote : QuoteNew
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
    }
}
