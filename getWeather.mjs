import { Client } from 'weathered';

const client = new Client();
const active = true;
const latitude = 35.76643210354103;
const longitude = -78.8147490445773;

async function getWeather(){
  
  let output = "";

  //write out date
  output += (new Date().toString()) + "\n<br>";
  try {
    
    //write out alerts if they exist
    const alerts = await client.getAlerts(active, { latitude, longitude });
    alerts.features.forEach(feature => {
      output += "ALERTS! : " + feature.properties.description  + "\n<br>";
      output += feature.geometry + "\n";
    });

    //write out current temperature
    const nearestStation = await client.getNearestStation(latitude, longitude);
    if (nearestStation) {
      const { stationIdentifier } = nearestStation.properties;
      const latestObservation = await client.getLatestStationObservations(stationIdentifier);
      var temperature = Math.round(latestObservation.properties.temperature.value * 9 /5 + 32)
      output += "<h3>Current Temperature: " + temperature + "F" + "🌡️\n</h3>";
      output += '<div id="topRightDiv">'+  temperature + "F" + "🌡️" +'</div>';
    }

    const forecast = await client.getForecast(latitude, longitude, 'baseline');
    forecast.properties.periods.forEach(period => {
      output += `<p>${period.name}: ${period.detailedForecast}  \n</p>`;
    });

    return output;

} catch (error) {
    
  return (new Date().toString()) + "\n<br><h1>Error:" + error.value + "</h1>"
}

  
}

export { getWeather };
