import React, {Fragment, Component} from 'react';
//import PropTypes from 'prop-types';
import CurrentGrab from '../../utils/CurrentGrab';
import CurrentForecast from '../current/current';
import ForecastGrab from '../../utils/ForecastGrab';


class Search extends Component{
    constructor(){
        super()
        this.state = {
            zip: '',
            today: [],
            forecast: [],
            submitted: false
        }
    }
        
        //pass once the 
        fetchCurrentWeather = zip => {
             CurrentGrab.getCurrentWeather(zip)
                .then(res => {
                    console.log(res);
                    this.setState({
                        today: res.data,
                        submitted: true
                    })
                })
                .catch(err => console.log(err))
        }

        componentDidMount(){
            this.fetchCurrentWeather();
        }

    
    handleChange = e => {
        const {value, name} = e.target;
        console.log(name + value);
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
    }

    // handleKeyPress = e => {
    //     if(e.keyCode === 13){
    //         this.handleSubmit();
    //     }
    // }

        render(){
            const isSubmitted = this.state.submitted
            //const {today, forecast} = this.state
            console.log(this.state);
            const today = [this.state.today];
            console.log(today);
            return(
                <Fragment>
                    <section className="search">
                        <form onSubmit = {this.handleSubmit} className="search__form">
                            <label 
                                htmlFor="searchBar" 
                                className="search__form-label"
                            >Search by Zip Code</label>
                            <input 
                                type="text" 
                                max="5"
                                className="search__form-input" 
                                value = {this.state.zip}
                                name="zip"
                                onChange = {this.handleChange}
                                onKeyPress = {(e) => {
                                    if(e.key === 'Enter'){
                                        this.handleSubmit();
                                    }
                                }}
                                id="searchBar"
                            />
                            <button 
                                className="search__form-button"
                                type="submit"
                            >Show the Weather</button>
                        </form>
                    </section>
                    <section className="results">
                        {
                            (isSubmitted) ? (
                                <CurrentForecast 
                                    date={today}
                                /> 
                                  
                            ) : null
                        }
                       
                         
                        <main className="results__forecast"></main>
                    </section>
                </Fragment>
            )
    }
}

export default Search;