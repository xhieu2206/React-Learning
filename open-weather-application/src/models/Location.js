import axios from 'axios';
import { GEO_API_KEY } from '../constants/API_KEY';

class Location {
  getLocationDetail = async (lat, lng) => {
    try {
      const res = await axios({
        method: 'GET',
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${GEO_API_KEY}`
      });
      return res.data;
    } catch (err) {
      return err;
    }
  }
}

export default Location;
