import axios from 'axios';

export default {
    getCurrentWeather: zipCode => {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=fa56bfa56d667c9243a012b42283ad11`)
        
    }
}