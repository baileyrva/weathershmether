$(document).ready(function() {
  var lat;
  var lon;

  for (var i = 0; i < localStorage.length; i++) {
    var currentCity = localStorage.getItem(localStorage.key(i));
    $("#previousCity").append(
      '<tr><td class="linkCity"><label> ' + currentCity + " </label></td></tr>"
    );
  }

  $(".linkCity").click(function() {
    var tr = $(this)
      .closest("tr")
      .find("label")
      .text();

    var NowMoment = moment().format("L");
    var eDisplayMoment = document.getElementById("displayMoment");
    eDisplayMoment.innerHTML = NowMoment;
    var userCity = tr;

    $("#currentCityLbl").text(userCity);
    ajaxCalls(userCity);
  });

  $(".searchBtn").click(function() {
    var NowMoment = moment().format("L");
    var eDisplayMoment = document.getElementById("displayMoment");
    eDisplayMoment.innerHTML = NowMoment;
    var userCity = $("#userCity").val();
    localStorage.setItem(userCity, userCity);
    $("#previousCity").append("<tr><td> " + userCity + " </td></tr>");
    $("#currentCityLbl").text(userCity);
    ajaxCalls(userCity); 
  });

  function ajaxCalls(userCity) {
    $.ajax({
      url:
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        userCity +
        "&units=imperial&appid=41a745f1eb505ff1affc1a58f9637280"
    }).done(function(html) {
      currentWeatherDisplay(html);
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
      fiveDayForecast(html);
    });
  }

  function currentWeatherDisplay(html) {
    var currentWeather = html.weather[0].main;
    if (currentWeather === "Clouds") {
      $("#currentIcon")
        .append("<i></i>")
        .addClass("fas fa-cloud-sun");
    } else if (currentWeather === "Rain") {
      $("#currentIcon")
        .append("<i></i>")
        .addClass("fas fa-cloud-rain");
    } else if (currentWeather === "Snow") {
      $("#currentIcon")
        .append("<i></i>")
        .addClass("fas fa-sun");
    } else if (currentWeather === "Thunderstorm") {
      $("#currentIcon")
        .append("<i></i>")
        .addClass("fas fa-bolt");
    } else {
      $("#currentIcon")
        .append("<i></i>")
        .addClass("fas fa-sun");
    }

    $("#currentTempLbl").text(html.main.temp);
    $("#currentHumLbl").text(html.main.humidity);
    $("#currentWindLbl").text(html.wind.speed);
    lat = html.coord.lat;
    lon = html.coord.lon;
  }

  function fiveDayForecast(html) {
    var currentDayOne = html.list[4].weather[0].main;
    var currentDayTwo = html.list[12].weather[0].main;
    var currentDayThree = html.list[20].weather[0].main;
    var currentDayFour = html.list[28].weather[0].main;
    var currentDayFive = html.list[36].weather[0].main;
    $("#weatherOneTime").text(moment(html.list[4].dt_txt).format("L"));
    $("#weatherOneTemp").text(html.list[4].main.temp);
    $("#weatherOneHum").text(html.list[4].main.humidity);
    $("#weatherTwoTime").text(moment(html.list[12].dt_txt).format("L"));
    $("#weatherTwoTemp").text(html.list[12].main.temp);
    $("#weatherTwoHum").text(html.list[12].main.humidity);
    $("#weatherThreeTime").text(moment(html.list[20].dt_txt).format("L"));
    $("#weatherThreeTemp").text(html.list[20].main.temp);
    $("#weatherThreeHum").text(html.list[20].main.humidity);
    $("#weatherFourTime").text(moment(html.list[28].dt_txt).format("L"));
    $("#weatherFourTemp").text(html.list[28].main.temp);
    $("#weatherFourHum").text(html.list[28].main.humidity);
    $("#weatherFiveTime").text(moment(html.list[36].dt_txt).format("L"));
    $("#weatherFiveTemp").text(html.list[36].main.temp);
    $("#weatherFiveHum").text(html.list[36].main.humidity);

    if (currentDayOne === "Clouds") {
      $("#dayOneIcon")
        .append("<i></i>")
        .addClass("fas fa-cloud-sun");
    } else if (currentDayOne === "Rain") {
      $("#dayOneIcon")
        .append("<i></i>")
        .addClass("fas fa-cloud-rain");
    } else if (currentDayOne === "Snow") {
      $("#dayOneIcon")
        .append("<i></i>")
        .addClass("fas fa-sun");
    } else if (currentDayOne === "Thunderstorm") {
      $("#dayOneIcon")
        .append("<i></i>")
        .addClass("fas fa-bolt");
    } else {
      $("#dayOneIcon")
        .append("<i></i>")
        .addClass("fas fa-sun");
    }

    if (currentDayTwo === "Clouds") {
      $("#dayTwoIcon")
        .append("<i></i>")
        .addClass("fas fa-cloud-sun");
    } else if (currentDayTwo === "Rain") {
      $("#dayTwoIcon")
        .append("<i></i>")
        .addClass("fas fa-cloud-rain");
    } else if (currentDayTwo === "Snow") {
      $("#dayTwoIcon")
        .append("<i></i>")
        .addClass("fas fa-sun");
    } else if (currentDayTwo === "Thunderstorm") {
      $("#dayTwoIcon")
        .append("<i></i>")
        .addClass("fas fa-bolt");
    } else {
      $("#dayTwoIcon")
        .append("<i></i>")
        .addClass("fas fa-sun");
    }

    if (currentDayThree === "Clouds") {
      $("#dayThreeIcon")
        .append("<i></i>")
        .addClass("fas fa-cloud-sun");
    } else if (currentDayThree === "Rain") {
      $("#dayThreeIcon")
        .append("<i></i>")
        .addClass("fas fa-cloud-rain");
    } else if (currentDayThree === "Snow") {
      $("#dayThreeIcon")
        .append("<i></i>")
        .addClass("fas fa-sun");
    } else if (currentDayThree === "Thunderstorm") {
      $("#dayThreeIcon")
        .append("<i></i>")
        .addClass("fas fa-bolt");
    } else {
      $("#dayThreeIcon")
        .append("<i></i>")
        .addClass("fas fa-sun");
    }

    if (currentDayFour === "Clouds") {
      $("#dayFourIcon")
        .append("<i></i>")
        .addClass("fas fa-cloud-sun");
    } else if (currentDayFour === "Rain") {
      $("#dayFourIcon")
        .append("<i></i>")
        .addClass("fas fa-cloud-rain");
    } else if (currentDayFour === "Snow") {
      $("#dayFourIcon")
        .append("<i></i>")
        .addClass("fas fa-sun");
    } else if (currentDayFour === "Thunderstorm") {
      $("#dayFourIcon")
        .append("<i></i>")
        .addClass("fas fa-bolt");
    } else {
      $("#dayFourIcon")
        .append("<i></i>")
        .addClass("fas fa-sun");
    }

    if (currentDayFive === "Clouds") {
      $("#dayFiveIcon")
        .append("<i></i>")
        .addClass("fas fa-cloud-sun");
    } else if (currentDayFive === "Rain") {
      $("#dayFiveIcon")
        .append("<i></i>")
        .addClass("fas fa-cloud-rain");
    } else if (currentDayFive === "Snow") {
      $("#dayFiveIcon")
        .append("<i></i>")
        .addClass("fas fa-sun");
    } else if (currentDayFive === "Thunderstorm") {
      $("#dayFiveIcon")
        .append("<i></i>")
        .addClass("fas fa-bolt");
    } else {
      $("#dayFiveIcon")
        .append("<i></i>")
        .addClass("fas fa-sun");
    }
  }
});
