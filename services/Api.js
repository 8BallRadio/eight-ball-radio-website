import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: 'https://eightballradio-backend.herokuapp.com/'
  });
}
