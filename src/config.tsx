import axios from 'axios'

export const SERVER_ADDRESS = 'http://172.30.1.59:8000/'

export const instance = axios.create({
  baseURL: 'http://172.30.1.59:8000/',
  timeout: 3000,
})
