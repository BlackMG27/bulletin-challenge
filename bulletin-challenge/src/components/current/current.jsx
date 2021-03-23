 import React, {Fragment} from 'react';
 import {getSunrise, getSunset} from 'sunrise-sunset-js';
 

 const CurrentForecast = (curr) => {
     console.log(curr.date.data);
      const sunrise = getSunrise(curr.date.data.coord.lat, curr.date.data.coord.lon)
      const sunset = getSunset(curr.date.data.coord.lat, curr.date.data.coord.lon)
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
         <h1 className="results__title">{curr.date.data.name}, {curr.date.data.country}</h1>
         <h2 className="results__date">{date}</h2>
        <aside className="results__current">
            <h3 className="results__current-temp">{curr.date.data.cTemp}</h3>
            <h4 className="results__current-feels">{curr.date.data.feels_like}</h4>
            <div className="results__current-weather">
                <img src={curr.date.data.weather[0].icon} alt={curr.date.data.weather[0].description} className="results__current-weather-icon"/>
                <p className="results__current-weather-info">{curr.date.data.weather[0].description}</p>
            </div>
            <p className="results__current-high">High: {curr.date.data.main.temp_max}</p>
            <p className="results__current-low">Low: {curr.date.data.main.temp_min}</p>
            <p className="results__current-sunrise">{sunrise}</p>
            <p className="results__current-sunset">{sunset}</p>
        </aside>
     </Fragment>
     )
 }

 export default CurrentForecast;