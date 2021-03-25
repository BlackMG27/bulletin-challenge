import React, {Fragment, Component} from 'react';
import {WeatherIcon} from 'weather-react-icons';
import 'weather-react-icons/lib/css/weather-icons.css';
import 'weather-react-icons/lib/css/weather-icons-wind.css';
//import PropTypes from 'prop-types'
import CurrentGrab from '../../utils/CurrentGrab';
import ForecastGrab from '../../utils/ForecastGrab';
import ForecastWeek from './../forecast/forecast';

class Search extends Component{
    constructor(){
        super()
        this.state = {
            zip: '',
            today: [],
            forecast: [],
            submitted: false,
            status: '',
            isLoading: false,
            night: false
        }
    }
        
        //pass once the form is submitted
        fetchCurrentWeather = zip => {
             CurrentGrab.getCurrentWeather(zip)
                .then(res => {
                    this.setState({
                        today: res.data,
                        status: res.status,
                        submitted: true
                    })
                })
                .catch(err => console.log(err))
        }

        fetchForecast = zip => {
            ForecastGrab.getForecast(zip)
            .then(res => {
                this.setState({
                    forecast: res.data.list,
                    status: res.status,
                    submitted: true
                })
            }).catch(err => console.log(err))
        }

        componentDidMount(){
            this.fetchCurrentWeather();
            this.fetchForecast();
        }

        makeRequest = () => {

        }

    
    handleChange = e => {
        const {value, name} = e.target;
        this.setState({
            [name]: value
        })
    }

   handleSubmit = e => {
        e.preventDefault();
        this.setState({
            ...this.state
        })
        this.fetchCurrentWeather(this.state.zip)
        this.fetchForecast(this.state.zip);
    }

    // handleKeyPress = e => {
    //     if(e.keyCode === 13){
    //         this.handleSubmit();
    //     }
    // }

        render(){
            const isSubmitted = this.state.submitted
            const status = parseInt(this.state.status);
            const checkZip = zip => {
                return /(^\d{5}$)/.test(zip)
            }
            const fConverter = temp => {
                 temp = (1.8 * (temp - 273)) + 32
                 return temp.toFixed(1)
            }
            //variables for current
            const today = this.state.today;
            //variables for the dates
            const dateOptions = {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                timezone: 'UTC'
            }
            const date = new Intl.DateTimeFormat('en-US', dateOptions).format(new Date())

            //variables for forecast 
            const forecast = this.state.forecast;
            let thisForecast, newForecast, max, min, thisHasRain, hasRain;
            const newForecastWeek = [];

            //group of the objects by date
            thisForecast = forecast.reduce((a, c) => {
                //if the date doesn't exist in the array
                if (!a[c.dt_txt.substring(0, 10)]) {
                  //sets each individual date as an array
                  a[c.dt_txt.substring(0, 10)] = [c];
                  //also checks to see if the that object is in the array
                } else {
                  //pushes that object into that specific date array
                  a[c.dt_txt.substring(0, 10)].push(c);
                }
                return a;
                //puts everything into an array
              }, {});
              //change the object into an array
              newForecast = Object.values(thisForecast)

              for (let t = 0; t < newForecast.length; t++) {
                //get the max
                max = newForecast[t].reduce((prev, cur) => {
                  return prev.main.temp_max > cur.main.temp_max ? prev : cur;
                });
                //get the min
                min = newForecast[t].reduce((prev, cur) => {
                  return prev.main.temp_min < cur.main.temp_min ? prev : cur;
                });
   
                //setup the rain checker function
                thisHasRain = (r) => {
                  return r.hasOwnProperty("rain");
                };
   
                //check if there's rain
                hasRain = newForecast[t].some(thisHasRain);
   
                //push them into newForecastWeek
                newForecastWeek.push({
                  high: max.main.temp_max,
                  low: min.main.temp_min,
                  rain: hasRain,
                  index: t
                });
              }
            
            return(
                <Fragment>
                    <section className="search">
                        <h1 className="app__title">Weather App</h1>
                        <form onSubmit = {this.handleSubmit} className="search__form">
                            <label 
                                htmlFor="searchBar" 
                                className="search__form-label"
                            >Search by US Zip Code</label>
                            <input 
                                type="text" 
                                maxLength="5"
                                placeholder="Example: 11221"
                                className="search__form-input" 
                                value = {this.state.zip}
                                name="zip"
                                onChange = {this.handleChange}
                                onKeyPress = {(e) => {
                                    if(e.key === 'Enter'){
                                        this.handleSubmit(e);
                                    }
                                }}
                                onFocus = { (e) => {
                                        if(!checkZip(e)) {
                                            <p className="error" role="alert">
                                                Please Enter a Valid Zip Code
                                            </p>
                                        }
                                    }
                                }
                                id="searchBar"
                            />
                            
                            <button 
                                className="search__form-button"
                                type="submit"
                            >Show Me the Weather</button>
                        </form>
                    </section>
                    
                        {
                            (isSubmitted) ? (
                                <section className="results">
                                    <h1 className="results__title">{today.name}, {today.sys.country}</h1> 
                                     <h2 className="results__date">{date}</h2>
                                     <div className="results__info" role="group">
                                     <aside className="results__current">
                                        <h3 className="results__current-temp">Temp: {fConverter(today.main.temp)} &deg;F</h3>
                                        <h4 className="results__current-feels">Feels Like: {fConverter(today.main.feels_like)}&deg;F</h4>
                                        <div className="results__current-weather">
                                            <WeatherIcon 
                                            iconId={today.weather[0].id} name="owm" className="results__current-weather-icon" 
                                            alt={today.weather[0].description} 
                                            />
                                        <p className="results__current-weather-info">Current Outlook: {today.weather[0].description}</p>
                                        </div>
                                            
                                        <p className="results__current-high">High: {fConverter(today.main.temp_max)}&deg;F</p>
                                        <p className="results__current-low">Low: {fConverter(today.main.temp_min)}&deg;F</p>
                                    
                                     </aside>
                                     <main className="results__forecast" role="list">
                                        {
                                            newForecastWeek.map((d, i) => (
                                                <ForecastWeek
                                                    date={d}
                                                    key={i}
                                                />
                                            ))
                                        }
                                        
                                     </main>
                                     </div>
                                     </section>
                            ) : null
        } 
                        
                    
                </Fragment>
            )
    }
}

export default Search;