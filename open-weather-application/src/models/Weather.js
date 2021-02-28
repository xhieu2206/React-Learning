import axios from 'axios';

import { API_KEY } from '../constants/API_KEY';
import { ENTRY_POINT } from '../constants/URLs';

class Weather {
  getWeatherByLatLng = async (lat, lng, units = 'metric') => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${ENTRY_POINT}/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=${units}`
      });
      return response.data;
    } catch (err) {
      return err;
    }
  }
}

export default Weather;
