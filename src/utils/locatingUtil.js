import axios from 'axios'

export function getCurrentPosition(success, error) {
    return navigator.geolocation.getCurrentPosition(success, error)
}

export async function getNearbyStore(latitute, longtitue, radius) {
    const URL = `https://cors.bridged.cc/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitute},${longtitue}&radius=${radius}&type=supermarket&key=${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}`
    return axios.get(URL).then(res => res.data)
}
