const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;


app.use(express.static('.')); // Serve static files

// Endpoint to get the list of images
//change this to weather

//this returns the weather text!
app.get('/weather', async (req, res) => {
  const weather = await import('./getWeather.mjs');
  const weatherText = await weather.getWeather(); // Assuming getWeather is now an async function returning weather text
  res.send(weatherText);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    import('open').then(open => open.default(`http://localhost:${port}`));
});
