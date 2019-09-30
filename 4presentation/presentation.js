function Presentation() {
  this.business = new BusinessLayer();

  var searchDiv = $("<div>").attr('class', 'searchDiv');
  $("body").append(searchDiv);
  
  var container = $("<div>").attr("class", "container").hide();
  $("body").append(container);

  var inner = $("<div>").attr("class", "inner");
  container.append(inner);

  var aqiDivContent = $("<div>").addClass("aqiDivContent opacity outline");
  inner.append(aqiDivContent);

  var weatherDiv = $("<div>").addClass("weatherDiv opacity outline");
  inner.append(weatherDiv);

  var infoDivContent = $("<div>").addClass("infoDiv opacity outline");
  inner.append(infoDivContent);

  var infoDivImage = $("<div>").attr('class', 'infoDivImage');
  container.append(infoDivImage);


  this.displayInput = () => {
    var input = $("<input>").attr('class', 'input').attr("placeholder", "Enter City or Country");
    var btn = $("<button>").attr("id", "btn").text("SEARCH");
    searchDiv.append(input);
    searchDiv.append(btn);

    $("#btn").on("click", () => {
      var searchedCity = $(input).val();
      weatherDiv.html("");
      aqiDivContent.html("");
      infoDivContent.html("");
      infoDivImage.html("");
      container.show();

      this.displayWeatherDetails(searchedCity);
      this.displayAqiDetails(searchedCity);
      this.displayCityDetails(searchedCity);
    });

    $("input").keyup((e) => {
      var searchedCity = $(input).val();
      if (e.keyCode === 13) {
        weatherDiv.html("");
        aqiDivContent.html("");
        infoDivContent.html("");
        infoDivImage.html("");
        container.show();

        this.displayWeatherDetails(searchedCity);
        this.displayAqiDetails(searchedCity);
        this.displayCityDetails(searchedCity);
      }
    });

  };

  this.displayWeatherDetails = async (searchedCity) => {
    var weatherDetails = await this.business.resolveWeatherApiData(searchedCity);

    this.business.mainWeather = weatherDetails;
    var mainWeather = weatherDetails.mainInfo;
    var clearSkyUrl = "https://vmcdn.ca/f/files/kitchenertoday/images/weather/sun.jpeg;w=630";
    var cloudsUrl = "https://c.pxhere.com/photos/47/9c/building_cloud_window_glass_cloudy-25139.jpg!d";
    var rainUrl = "https://c.pxhere.com/photos/c2/1a/buildings_droplets_drops_glass_lamppost_liquid_motion_rain-1268187.jpg!d";
    var thunderUrl = "https://i.pinimg.com/originals/72/cd/28/72cd28d8253b9b45fb01e8a1d3ecd8a4.jpg"; // url2 https://fosmedia.me/sites/default/files/slike/2018/06/iStock-682650612.jpg
    var snowUrl = "https://c.pxhere.com/photos/0f/6d/snow_street_townhouses_city_urban_winter_residential_new_york-672753.jpg!d";
    var fogUrl = "https://ronaldpoelsphotography.files.wordpress.com/2016/03/p1030584-ildi.jpg";

    if (mainWeather === "Clear") {
      container.css({ "background": "url('" + clearSkyUrl + "') no-repeat", "background-size": "cover", "background-attachment": "fixed" });
    }
    else if (mainWeather === "Clouds") {
      container.css({ "background": "url('" + cloudsUrl + "') no-repeat", "background-size": "cover", "background-attachment": "fixed" });
    }
    else if (mainWeather === "Rain" || "Drizzle") {
      container.css({ "background": "url('" + rainUrl + "') no-repeat", "background-size": "cover", "background-attachment": "fixed" });
    }
    else if (mainWeather === "Thunderstorm") {
      container.css({ "background": "url('" + thunderUrl + "') no-repeat", "background-size": "cover", "background-attachment": "fixed" });
    }
    else if (mainWeather === "Snow") {
      container.css({ "background": "url('" + snowUrl + "') no-repeat", "background-size": "cover", "background-attachment": "fixed" });
    }
    else {
      container.css({ "background": "url('" + fogUrl + "') no-repeat", "background-size": "cover", "background-attachment": "fixed" });
    }


    var weatherCityNameDiv = $("<div>").attr('class', 'name').text(weatherDetails.currentCity);
    var weatherTempDiv = $("<div>").attr('class', 'temp').text(Math.round(weatherDetails.currentTemp) + " °C");
    var weatherIcon = $("<img>").attr('class', 'icon').attr("src", "http://openweathermap.org/img/w/" + weatherDetails.weatherIcon + ".png");
    var weatherDescription = $("<div>").attr('class', 'info').text(weatherDetails.descriptionInfo);

    weatherDiv.append(weatherCityNameDiv);
    weatherDiv.append(weatherTempDiv);
    weatherDiv.append(weatherIcon);
    weatherDiv.append(weatherDescription);

    console.log(weatherDetails);
  };

  this.displayAqiDetails = async (searchedCity) => {
    var aqiDetails = await this.business.resolvedAqiInfo(searchedCity);

    var aqiDiv = $("<div>").attr('class', 'aqi').text("AQI: " + aqiDetails.aqi);
    var pm10Div = $("<div>").attr('class', 'pm1').text("PM 10: " + Math.round(aqiDetails.pm10) + " µg/m3");
    var pm25Div = $("<div>").attr('class', 'pm2').text("PM 2.5: " + Math.round(aqiDetails.pm25) + " µg/m3");

    aqiDivContent.append(aqiDiv);
    aqiDivContent.append(pm10Div);
    aqiDivContent.append(pm25Div);
  }

  this.displayCityDetails = async (searchedCity) => {
    var cityDetails = await this.business.resolvedCityInfo(searchedCity);

    var cityInfo = $("<div>").attr('class', 'cityinfo').text(cityDetails.shortInfo);
    var cityImage = $("<img>").attr('class', 'cityimg').attr("src", cityDetails.cityLandmarks);

    infoDivContent.append(cityInfo);
    infoDivImage.append(cityImage);
  }

}  