import { Client } from 'weathered';

const client = new Client();
const active = true;
const latitude = 35.76643210354103;
const longitude = -78.8147490445773;

async function getWeather(){
  
  let output = "";

  //write out date
  //console.log(new Date().toString());
  output += (new Date().toString()) + "\n<br>";

  //write out alerts if they exist
  const alerts = await client.getAlerts(active, { latitude, longitude });
  alerts.features.forEach(feature => {
    console.log(feature.properties.description);
    output += "ALERTS! : " + feature.properties.description  + "\n<br>";
    //console.log(feature.geometry);
    output += feature.geometry + "\n";
  });

  //write out current temperature
  const nearestStation = await client.getNearestStation(latitude, longitude);
  if (nearestStation) {
    const { stationIdentifier } = nearestStation.properties;
    const latestObservation = await client.getLatestStationObservations(stationIdentifier);
    //console.log(latestObservation.properties.temperature);
    var temperature = latestObservation.properties.temperature.value * 9 /5 + 32
    //console.log("Current Temperature: " + temperature + "F")
    output += "<h3>Current Temperature: " + temperature + "F" + "🌡️\n</h3>";

  }


  const forecast = await client.getForecast(latitude, longitude, 'baseline');
  forecast.properties.periods.forEach(period => {
    //console.log(`${period.name}: ${period.detailedForecast}`);
    output += `<p>${period.name}: ${period.detailedForecast}  \n</p>`;
  });

  return output;
}

//console.log(await getWeather())
export { getWeather };
