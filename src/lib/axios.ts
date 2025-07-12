import Axios from 'axios'

const axios = Axios.create({
  // baseURL: 'http://127.0.0.1:8000/api',
  baseURL: 'http://absensi-api.test/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default axios
