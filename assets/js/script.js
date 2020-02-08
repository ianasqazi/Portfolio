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
    $("#weatherForcast").hide();
    // $("#weatherForcast").show();
    getLocation();
    // callWeatherAPI(position);
});

function callWeatherAPI(position){
    $("#weatherForcast").show();

    // var currentCity = $.trim($("#searchCity").val());
    // var currentCity = "Toronto";
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var currentDate = moment().format("MMMM Do YYYY");
    var currentDay = moment().format("dddd");
    
    var APIKey = "b72c0d35aba9f0b8c0e9ebb9ec68c3f8";
  
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=metric&appid=" + APIKey;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat  +"&lon=" + lon + "&units=metric&appid=" + APIKey;
    // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}

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


function getLocation() {
    
    navigator.geolocation.getCurrentPosition(function(position) {
    
        console.log(position);

    callWeatherAPI(position);

      });

    
      } 

// TEXT - ROTATE

var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
    };

TxtRotate.prototype.tick = function() {
var i = this.loopNum % this.toRotate.length;
var fullTxt = this.toRotate[i];

if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
} else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
}

this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

var that = this;
var delta = 300 - Math.random() * 100;

if (this.isDeleting) { delta /= 2; }

if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
} else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
}

setTimeout(function() {
    that.tick();
}, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };