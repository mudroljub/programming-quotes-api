using Microsoft.AspNetCore.Mvc;
using ProgrammingQuotesApi.Controllers;
using ProgrammingQuotesApi.Services;
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
            var response = controller.GetQuotes(count);
            var result = response.Result as OkObjectResult;
            var quotes = result.Value as List<Quote>;
            Assert.Equal(count, quotes.Count);
        }

        [Fact]
        public void GetQuotes_Returns_All_Quotes_By_Default()
        {
            var controller = new QuotesController();
            var response = controller.GetQuotes();
            var result = response.Result as OkObjectResult;
            var quotes = result.Value as List<Quote>;
            var serviceQuotes = QuotesService.GetQuotes();
            Assert.Equal(quotes.Count, serviceQuotes.Count);
        }

        [Fact]
        public void GetRandom_Returns_Two_Different_Quotes_Consecutively()
        {
            var controller = new QuotesController();
            var result1 = controller.GetRandom().Result as OkObjectResult;
            var quote1 = result1.Value as Quote;
            var result2 = controller.GetRandom().Result as OkObjectResult;
            var quote2 = result2.Value as Quote;
            Assert.NotEqual(quote1.Id, quote2.Id);
        }

        [Fact]
        public void Get_Not_Returns_If_Incorect_Id()
        {
            var controller = new QuotesController();
            var response = controller.Get("blabla");
            var result = response.Result as NotFoundResult;
            Assert.Equal(404, result.StatusCode);
            Assert.IsType<NotFoundResult>(result);
        }

    }
}
