const body = document.querySelector('body');
const currentLocation = document.querySelector('.location');
const weatherIcon = document.querySelector('.icon');
const temperatureDiv = document.querySelector('.temperature');
const temperatureDegree = document.querySelector('.temperature-degree')
const temperatureUnit = document.querySelector('.temperature-unit');
const temperatureText = document.querySelector('.temperature-description');

window.addEventListener('load', () => {
    let lat;
    let long;
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            const api = `http://api.weatherapi.com/v1/current.json?key=cfc640a7a6944a67a6590002211811&q=${lat},${long}&aqi=no`

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {is_day, temp_c, temp_f} = data.current;
                    const {name, region} = data.location;
                    const {text, icon} = data.current.condition;

                    currentLocation.textContent = `${name}/${region}`;
                    weatherIcon.innerHTML = `<img class="weather-icon" src="https://${icon.substring(2)}">`;
                    temperatureDegree.textContent = temp_f;
                    temperatureText.textContent = text;

                    if(is_day) {
                        body.style.backgroundImage = `linear-gradient(60deg, var(--light-bg-color-1), var(--light-bg-color-2))`;
                    }
                    else {
                        body.style.backgroundImage = `linear-gradient(60deg, var(--dark-bg-color-1), var(--dark-bg-color-2))`;
                    }

                    temperatureDiv.addEventListener('click', () => {
                        if(temperatureUnit.textContent === 'F') {
                            temperatureUnit.textContent = 'C';
                            temperatureDegree.textContent = temp_c;
                        }
                        else {
                            temperatureUnit.textContent = 'F';
                            temperatureDegree.textContent = temp_f;
                        }
                    });
                });
        });
    }
});