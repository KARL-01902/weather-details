// Hamburger Menu Toggle
function toggleNavbar() {
    var navbar = document.getElementById("navbar");
    navbar.classList.toggle("responsive");
}

// OpenWeatherMap API Key
const apiKey = '6b24c6e99ce34bd5b1143036241812';  // Replace with your actual API key

// Search button functionality
document.getElementById('searchButton').addEventListener('click', function () {
    const cityInput = document.getElementById('cityInput').value.trim();
    const weatherDetails = document.getElementById('weatherDetails');
    const errorMessage = document.getElementById('errorMessage');

    // Reset sections
    weatherDetails.style.display = 'none';
    errorMessage.innerHTML = '';
    document.body.classList.remove("morning");
    document.body.classList.remove("night");
    document.body.classList.remove("afternoon");
    document.body.classList.remove("evening");

    if (cityInput === '') {
        errorMessage.innerHTML = 'Please enter a city name.';
        return;
    }
    let Loca_Time;
    // Fetch weather data from OpenWeatherMap API
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityInput}&days=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                // Display weather data
                document.getElementById('cityName').textContent = `${data.location.name}`;
                document.getElementById('currentDate').textContent = `Date: ${(data.location.localtime).substr(0,11)}`;
                document.getElementById('currentTime').textContent = `Local-Time: ${(data.location.localtime).substr(11,17)}`;
                Loca_Time=Number((data.location.localtime).substr(11,17).substr(0,2));
                document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c}°C`;
                document.getElementById('description').textContent = `Weather: ${data.current.condition.text}`;
                document.getElementById('weatherIcon').src = data.current.condition.icon;
                document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;
                document.getElementById('windSpeed').textContent = `Wind Speed: ${data.current.wind_mph} miles/hour`;
                document.getElementById('pressure').textContent = `Pressure: ${data.current.pressure_mb} mb`;
                weatherDetails.style.display = 'block';
                
            } else {
                // Error handling
                errorMessage.innerHTML = 'City not found. Please try again.';
            }            

            if( (Loca_Time<6)||(Loca_Time<24 && Loca_Time>20)){document.body.classList.add('night')}
            else if(Loca_Time<12 && Loca_Time>=6){document.body.classList.add('morning')}
            else if(Loca_Time<16 && Loca_Time>=12){document.body.classList.add('afternoon')}
            else{document.body.classList.add('evening')}
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            errorMessage.innerHTML = 'Unable to fetch data. Please try again later.';
        });
});

// Back-to-top functionality
window.onscroll = function () {
    const backToTopButton = document.getElementById("backToTop");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}