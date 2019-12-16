$(document).ready(function() {
  for (var i = 0; i < localStorage.length; i++) {
    var currentCity = localStorage.getItem(localStorage.key(i));
    $("#previousCity").append("<tr><td> " + currentCity + " </td></tr>");
  }

  $(".searchBtn").click(function() {
    var userCity = $("#userCity").val();
    localStorage.setItem(userCity, userCity);
    $("#previousCity").append("<tr><td> " + userCity + " </td></tr>");
    $("#currentCityLbl").text(userCity);
    $.ajax({
      url:
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        userCity +
        "&units=imperial&appid=41a745f1eb505ff1affc1a58f9637280"
    }).done(function(html) {
      $("#weatherIcon").text(html.weather.id);
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
  });
  var NowMoment = moment().format("MMM Do YY");
  var eDisplayMoment = document.getElementById("displayMoment");
  eDisplayMoment.innerHTML = NowMoment;
});
