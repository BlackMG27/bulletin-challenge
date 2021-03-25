import axios from 'axios';


   export default {
     getForecast: zipCode => {
       return axios
         .get(
           `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=fa56bfa56d667c9243a012b42283ad11`
         )
        //  .then((res) => {
        //    //group the objects by date
        //    forecast = res.data.list.reduce((a, c) => {
        //      //if the date doesn't exist in the array
        //      if (!a[c.dt_txt.substring(0, 10)]) {
        //        //sets each individual date as an array
        //        a[c.dt_txt.substring(0, 10)] = [c];
        //        //also checks to see if the that object is in the array
        //      } else {
        //        //pushes that object into that specific date array
        //        a[c.dt_txt.substring(0, 10)].push(c);
        //      }
        //      return a;
        //      //puts everything into an array
        //    }, {});

        //    //convert info an array
        //    let newForecast = Object.values(forecast);
        //    //setup the final forecast array
        //    //setup the variables
        //    let max, min, thisHasRain, hasRain;

        //    //get to each set of arrays

        //    //get the max of each set
        //    for (let t = 0; t < newForecast.length; t++) {
        //      //get the max
        //      max = newForecast[t].reduce((prev, cur) => {
        //        return prev.main.temp_max > cur.main.temp_max ? prev : cur;
        //      });
        //      //get the min
        //      min = newForecast[t].reduce((prev, cur) => {
        //        return prev.main.temp_min < cur.main.temp_min ? prev : cur;
        //      });

        //      //setup the rain checker function
        //      thisHasRain = (r) => {
        //        return r.hasOwnProperty("rain");
        //      };

        //      //check if there's rain
        //      hasRain = newForecast[t].some(thisHasRain);

        //      //push them into newForecastWeek
        //      newForecastWeek.push({
        //        high: max.main.temp_max,
        //        low: min.main.temp_min,
        //        rain: hasRain,
        //      });
        //    }
        //  });
     },
   };   
