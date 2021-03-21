const CurrentWeather = {},
    time = new Date().setHours(0,0,0,0);
    //console.log(setTime(1616327167));

 
const dateOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timezone: 'UTC'
}

fetch('https://api.openweathermap.org/data/2.5/weather?zip=46614&appid=fa56bfa56d667c9243a012b42283ad11')
.then(res => res.json())
.then(data => {
    console.log(data)
    //set the essentials to CurrentWeather
    CurrentWeather.name = data.name,
    CurrentWeather.country = data.sys.country,
    CurrentWeather.cTemp = data.main.temp,
    CurrentWeather.max_temp = data.main.temp_max,
    CurrentWeather.min_temp = data.main.temp_min,
    CurrentWeather.feels_like = data.main.feels_like,
    CurrentWeather.weather = data.weather,
    CurrentWeather.lon = data.coord.lon,
    CurrentWeather.lat = data.coord.lat,
    CurrentWeather.date = new Intl.DateTimeFormat('en-US', dateOptions).format(new Date())
})

export default CurrentWeather;