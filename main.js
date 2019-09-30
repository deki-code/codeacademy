function main() {
  
    var presentation = new Presentation();
    presentation.displayInput();

    // var persistance = new WeatherApi();
    // var searchedCity = "skopje"
    // persistance.getAqiData(searchedCity);

    var business = new BusinessLayer();
    business.resolvedCityInfo("skopje");
  }
  
  main();