import Axios from 'axios'

const axios = Axios.create({
  // baseURL: 'http://127.0.0.1:8000/api',
  baseURL: 'https://sahil-api.perintisilmu.sch.id/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default axios
