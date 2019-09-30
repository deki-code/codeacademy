function WeatherApi() {


    this.getWeatherApiData = (searchedCity) => {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&units=metric&APPID=e5a46efb7eb8c41236961878afa2d0f9",
          type: "GET",
          success: function(data) {
            resolve(data);
            console.log(data);
          },
          error: function(error) {
            reject(error);           
            alert("Vnesete drug grad");
          }
        });
      });
    };

    this.getAqiData = (searchedCity) => {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: "https://api.weatherbit.io/v2.0/current/airquality?city=" + searchedCity + "&key=437769a80fb04f8983c2d4b313b1c6c1",
          type: "GET",
          success: function(data) {
            resolve(data);
            console.log(data);
          },
          error: function(error) {
            reject(error);
          }
        });
      });
    }

    this.getCityData = (searchedCity) => {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: "https://en.wikipedia.org/api/rest_v1/page/summary/" + searchedCity,
          type: "GET",
          success: function(data) {
            resolve(data);
            console.log(data);
          },
          error: function(error) {
            reject(error);
          }
        });
      });
    }
    
  }