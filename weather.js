$(document).ready(function() {
  for (var i = 0; i < localStorage.length; i++) {
    var currentCity = localStorage.getItem(localStorage.key(i));
    $("#previousCity").append("<tr><td> " + currentCity + " </td></tr>");
  }

  $(".searchBtn").click(function() {
    var NowMoment = moment().format('L');
    var eDisplayMoment = document.getElementById("displayMoment");
    eDisplayMoment.innerHTML = NowMoment;
    var userCity = $("#userCity").val();
    localStorage.setItem(userCity, userCity);
    $("#previousCity" ).append("<tr><td> " + userCity + " </td></tr>");
    $("#currentCityLbl" ).text(userCity);
    $.ajax({
      url:
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        userCity +
        "&units=imperial&appid=41a745f1eb505ff1affc1a58f9637280"
    }).done(function(html) {
      var currentWeather = html.weather[0].main 
      if (currentWeather === "Clouds") {
        $("#currentIcon").append("<i></i>").addClass('fas fa-cloud-sun');
      }
      else if (currentWeather === "Rain") {
        $("#currentIcon").append("<i></i>").addClass('fas fa-cloud-rain');
      }
      else if (currentWeather === "Snow") {
        $("#currentIcon").append("<i></i>").addClass('fas fa-sun');
      }
      else if (currentWeather === "Thunderstorm") {
        $("#currentIcon").append("<i></i>").addClass('fas fa-bolt');
      }
      else {
        $("#currentIcon").append("<i></i>").addClass('fas fa-sun');
      }


      $("#currentTempLbl").text(html.main.temp);
      $("#currentHumLbl").text(html.main.humidity);
      $("#currentWindLbl").text(html.wind.speed);
      var lat = html.coord.lat;
      var lon = html.coord.lon;
      $.ajax({
        url:
          "http://api.openweathermap.org/data/2.5/uvi?&appid=41a745f1eb505ff1affc1a58f9637280&lat=" +
          lat +
          "&lon=" +
          lon
      }).done(function(html) {
        $("#currentUVLbl").text(html.value);
      });
    });
    $.ajax({
      url:
        "http://api.openweathermap.org/data/2.5/forecast?&appid=41a745f1eb505ff1affc1a58f9637280&q=" +
        userCity +
        "&units=imperial&mode=JSON"
    }).done(function(html) {
      var currentDayOne = html.list[4].weather[0].main
      var currentDayTwo = html.list[12].weather[0].main
      var currentDayThree = html.list[20].weather[0].main
      var currentDayFour = html.list[28].weather[0].main
      var currentDayFive = html.list[36].weather[0].main
      console.log(html.list[36].weather[0].main)
      $("#dayOneIcon").append("<i></i>").addClass('fas fa-sun');
      $("#dayTwoIcon").append("<i></i>").addClass('fas fa-sun');
      $("#weatherOneTime").text(moment(html.list[4].dt_txt).format('L'));
      $("#weatherOneTemp").text(html.list[4].main.temp);
      $("#weatherOneHum").text(html.list[4].main.humidity);
      $("#weatherTwoTime").text(moment(html.list[12].dt_txt).format('L'));
      $("#weatherTwoTemp").text(html.list[12].main.temp);
      $("#weatherTwoHum").text(html.list[12].main.humidity);
      $("#weatherThreeTime").text(moment(html.list[20].dt_txt).format('L'));
      $("#weatherThreeTemp").text(html.list[20].main.temp);
      $("#weatherThreeHum").text(html.list[20].main.humidity);
      $("#weatherFourTime").text(moment(html.list[28].dt_txt).format('L'));
      $("#weatherFourTemp").text(html.list[28].main.temp);
      $("#weatherFourHum").text(html.list[28].main.humidity);
      $("#weatherFiveTime").text(moment(html.list[36].dt_txt).format('L'));
      $("#weatherFiveTemp").text(html.list[36].main.temp);
      $("#weatherFiveHum").text(html.list[36].main.humidity);
    });
  });
});
