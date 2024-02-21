function updateWeather() {
    const weather = document.getElementById('weather');
    fetch('/weather')
      .then(response => response.text()) // Convert the response to text
      .then(text => {
        weather.innerHTML = text; // Update the innerHTML with the fetched text
        setTimeout(updateWeather, 900000); // Refresh every 3000 milliseconds
      })
      .catch(error => console.error('Error fetching weather:', error));
  }
  
  // Call updateWeather on load
  updateWeather();
  