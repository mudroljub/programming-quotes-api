using Microsoft.AspNetCore.Mvc;
using ProgrammingQuotesApi.Controllers;
using ProgrammingQuotesApi.Models;
using System.Collections.Generic;
using Xunit;

namespace ProgrammingQuotesApi.Tests
{
    public class QuotesControllerTests
    {
        [Fact]
        public void GetQuotes_Returns_The_Correct_Numbers_Of_Quotes()
        {
            int count = 5;
            var controller = new QuotesController();
            var action = controller.GetQuotes(count);
            var result = action.Result as OkObjectResult;
            var quotes = result.Value as List<Quote>;
            Assert.Equal(count, quotes.Count);
        }
    }
}
