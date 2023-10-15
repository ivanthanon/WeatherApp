document.addEventListener("DOMContentLoaded", () => {

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");

    function checkWeather(city) {
        firstApi_today(city);
        secondApi_FourNextDays(city);
    }

    async function firstApi_today(city) {
        const apiUrl = "https://localhost:7223/WeatherForecast/getTodayWeather/";
        const response = await fetch(apiUrl + city);
        var data = await response.json();

        const apiResponse = {
            name: data.name,
            temperature: Math.round(data.main.temp),
            humidity: data.main.humidity,
            windSpeed: data.wind.speed
        }

        let selectors = [".city", ".temp", ".humidity", ".wind"];
        let data_of_response = [apiResponse.name, apiResponse.temperature + "ºc", apiResponse.humidity + "%", apiResponse.windSpeed + " km/h"];

        for (let j = 0; j < 4; j++) {
            (document.querySelector(selectors[j])).innerHTML = data_of_response[j];
        }

        updateImg(data.weather[0].main, ".wheather-icon");
    }

    async function secondApi_FourNextDays(city) {
        const apiUrl = "https://localhost:7223/WeatherForecast/getFourNextDays/";

        const response2 = await fetch(apiUrl + city);
        var data2 = await response2.json();

        let counter = 1;
        for (let i = 8; i < 33; i = i + 8) {

            const apiResponse = {
                forecastToday: data2.list[i].weather[0].main,
                fullDate: data2.list[i].dt_txt,
                degrees: data2.list[i].main.temp
            }

            updateImg(apiResponse.forecastToday, `.img${counter}`);
            refreshDays(apiResponse.fullDate, counter);
            refreshDegrees(apiResponse.degrees, counter);
            counter++;
        }
    }

    function refreshDegrees(degrees, counter) {
        document.querySelector(".degree" + counter).innerHTML = degrees + "º";
    }

    function refreshDays(fullDate, counter) {
        let extractDay = (new Date(fullDate)).toDateString().substring(0, 3);
        document.querySelector(".day" + counter).innerHTML = translateDayToSpanish(extractDay);
    }

    function translateDayToSpanish(onlyDay) {
        switch (onlyDay) {
            case "Mon": return "Lunes"
            case "Tue": return "Martes"
            case "Wed": return "Miércoles"
            case "Thu": return "Jueves"
            case "Fri": return "Viernes"
            case "Sat": return "Sábado"
            case "Sun": return "Domingo"
        }
    }

    function updateImg(estado, path) {
        switch (estado) {
            case "Clouds": document.querySelector(path).src = "images/nubes.png";
                break;
            case "Clear": document.querySelector(path).src = "images/sol.png";
                break;
            case "Rain": document.querySelector(path).src = "images/lluvia.png";
                break;
            case "Drizzle": document.querySelector(path).src = "images/llovizna.png";
                break;
        }
    }

    searchBtn.addEventListener("click", () => {
        if (!searchBox.value) {
            return alert("Introduzca una ciudad");
        }
        checkWeather(searchBox.value);
    })
});
