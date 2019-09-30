function DataLayer() {
    this.weatherApiData = {};
    this.persistanceObject = new WeatherApi();
    this.aqiData = {};
    this.cityData = {};

    this.populateWeatherApiData = async (searchedCity) => {
        this.weatherApiData = await this.persistanceObject.getWeatherApiData(searchedCity);
    };

    this.getWeatherApiData = () => {
        return this.weatherApiData;
    };

    this.populateAqiData = async (searchedCity) => {
        this.aqiData = await this.persistanceObject.getAqiData(searchedCity);
    };

    this.getAqiData = () => {
        return this.aqiData;
    };

    
    this.populateCityData = async (searchedCity) => {
        this.cityData = await this.persistanceObject.getCityData(searchedCity);
    };

    this.getCityData = () => {
        return this.cityData;
    };
}