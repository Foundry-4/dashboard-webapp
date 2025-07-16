import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.namesaja.com.br/api'
})
