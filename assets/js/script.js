$(window).scroll(function(e) {

    // add/remove class to navbar when scrolling to hide/show
    var scroll = $(window).scrollTop();
    if (scroll >= 150) {
        $('.navbar').addClass("navbar-hide");
    } else {
        $('.navbar').removeClass("navbar-hide");
    }

});

$(document).ready(function(){

    callWeatherAPI();
});

function callWeatherAPI(){
    // var currentCity = $.trim($("#searchCity").val());
    var currentCity = "Toronto";

    var currentDate = moment().format("MMMM Do YYYY");
    var currentDay = moment().format("dddd");
    
    var APIKey = "b72c0d35aba9f0b8c0e9ebb9ec68c3f8";
  
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=metric&appid=" + APIKey;
    
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=" + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET"
      }).then(function(response) {

            $("#dayDate").text(currentDay+ ", " + currentDate);

            $("#currentCity").text(response.name);
            $("#currentCountry").text(", " + response.sys.country)
            
            $("#weatherInfo").text(response.weather[0].main);
            var iconCode=response.weather[0].icon;
            var iconURL="https://openweathermap.org/img/w/"+iconCode+".png";
            $("#weatherIcon").attr("src",iconURL);
            
  
            $("#currentTemp").text(":" + response.main.temp + String.fromCharCode(176) + "C");
            $("#tempLow").text(":" + response.main.temp_min + String.fromCharCode(176) + "C");
            $("#tempHigh").text(":" + response.main.temp_max + String.fromCharCode(176) + "C");

            $("#humidity").text(":" + response.main.humidity + "%");
            $("#pressure").text(":" + response.main.pressure + "hpa")
            $("#windSpeed").text(":" + response.wind.speed + "m/s");
  
 
          });
  
          // Save the value of the searched element in the localStorage
          localStorage.setItem("lastSearchedCity",currentCity);
  
    }
