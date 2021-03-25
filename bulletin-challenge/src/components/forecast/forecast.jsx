import React, {Fragment} from 'react';
import Moment from 'react-moment';

const ForecastWeek = (fore) => {
    const {high, low, rain, index} = fore.date;
    const fConverter = temp => {
        temp = (1.8 * (temp - 273)) + 32
        return temp.toFixed(1)
    }
    const nDate = new Date();
    return (
        <Fragment>
            <article className="results__forecast-article" role="listitem">
                  <div className="results__forecast-article-date" role="contentinfo">
                    <h2 className="results__forecast-article-date-title">
                        <Moment add={{days: index + 1}} format="MM/DD">{nDate}</Moment>
                    </h2>
                  </div>
                  <div className="results__forecast-article-weather" role="contentinfo">
                    <h5 className="results__forecast-article-weather-info">
                        High: {fConverter(high)}&deg;F
                    </h5>
                    <h5 className="results__forecast-article-weather-info">
                        Low: {fConverter(low)}&deg;F
                    </h5>
                  </div>
                  <div className="results__forecast-article-rain">
                  <h5 className="results__forecast-article-rain-info">Will It Rain?
                            </h5>
                            {
                                (rain) ? (
                                    <p className="results__forecast-article-rain-info-a">Get an Umbrella</p>
                                ): (
                                    <p className="results__forecast-article-weather-info-a">You're Fine</p>
                                )
                            }
                    
                  </div>
            </article>
        </Fragment>
    )
}

export default ForecastWeek;