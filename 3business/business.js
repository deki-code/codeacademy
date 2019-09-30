function BusinessLayer() {
    this.dataObject = new DataLayer();
  
    this.resolveWeatherApiData = async (searchedCity) => {
      await this.dataObject.populateWeatherApiData(searchedCity);
      var data = this.dataObject.getWeatherApiData();
      console.log(data);

    var modifiedWeatherInfo = {
        mainInfo: data.weather[0].main,
        descriptionInfo: data.weather[0].description,
        weatherIcon: data.weather[0].icon,
        currentTemp: data.main.temp,
        currentCity: data.name
    }
    return modifiedWeatherInfo;
    }

    this.resolvedAqiInfo = async (searchedCity) => {
      await this.dataObject.populateAqiData(searchedCity);
      var data = this.dataObject.getAqiData();

      var modifiedAqiInfo = {
        aqi: data.data[0].aqi,
        pm10: data.data[0].pm10,
        pm25: data.data[0].pm25
      }
      return modifiedAqiInfo;
    }

    this.resolvedCityInfo = async (searchedCity) => {
      await this.dataObject.populateCityData(searchedCity);
      var data = this.dataObject.getCityData();

      var modifiedCityInfo = {
        cityName: data.title,
        cityLandmarks: data.originalimage.source,
        shortInfo: data.extract

      }
      console.log(modifiedCityInfo);
      return modifiedCityInfo;
    }
}
