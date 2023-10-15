using Microsoft.AspNetCore.Mvc;

namespace WeatherAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        static readonly HttpClient client = new HttpClient();
       

        [HttpGet("getTodayWeather/{city}")]
        public async Task<IActionResult> GetToday(string city)
        {

            if (string.IsNullOrEmpty(city)) return BadRequest("Debes proporcionar el nombre de la ciudad.");
            

            const string baseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
            const string apiKey = "a7a6acf4bb38c97fe6bfa1a3c782bd77";

            try
            {
                using HttpResponseMessage apiResponseOne = await client.GetAsync(baseUrl + city + "&appid=" + apiKey);
                apiResponseOne.EnsureSuccessStatusCode();
                string responseBody = await apiResponseOne.Content.ReadAsStringAsync();

                return Ok(responseBody);
            }
            catch (HttpRequestException err)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message: {0}", err.Message);
                return StatusCode(500, "Error al obtener los datos del clima.");
            }
        }


        [HttpGet("getFourNextDays/{city}")]
        public async Task<IActionResult> GetFourNextDays(string city)
        {

            if (string.IsNullOrEmpty(city)) return BadRequest("Debes proporcionar el nombre de la ciudad.");
            
            const string baseUrl = "http://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
            const string apiKey = "954902a986700007cf1fd9b393681109";

            try
            {
                using HttpResponseMessage response = await client.GetAsync(baseUrl + city + "&appid=" + apiKey);
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();

                return Ok(responseBody);
            }
            catch (HttpRequestException error)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message: {0}", error.Message);
                return StatusCode(500, "Error al obtener los datos del clima.");
            }
        }
    }
}
