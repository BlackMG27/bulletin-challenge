 import React, {Fragment} from 'react';
 import {getSunrise, getSunset} from 'sunrise-sunset-js';
 

 const CurrentForecast = (curr) => {
     console.log(curr);
    const {name, feels_like, cTemp, weather, country, coord, main} = curr;
    const {temp_max, temp_min} = curr.main
      const sunrise = getSunrise(coord.lat, coord.lon)
      const sunset = getSunset(coord.lat, coord.lon)
     const dateOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timezone: 'UTC'
    }
     const date = new Intl.DateTimeFormat('en-US', dateOptions).format(new Date())
     return(
     <Fragment>
         <h1 className="results__title">{name}, {country}</h1>
         <h2 className="results__date">{date}</h2>
        <aside className="results__current">
            <h3 className="results__current-temp">{cTemp}</h3>
            <h4 className="results__current-feels">{feels_like}</h4>
            <div className="results__current-weather">
                <img src={weather[0].icon} alt={weather[0].description} className="results__current-weather-icon"/>
                <p className="results__current-weather-info">{weather[0].description}</p>
            </div>
            <p className="results__current-high">High: {temp_max}</p>
            <p className="results__current-low">Low: {temp_min}</p>
            <p className="results__current-sunrise">{sunrise}</p>
            <p className="results__current-sunset">{sunset}</p>
        </aside>
     </Fragment>
     )
 }

 export default CurrentForecast;