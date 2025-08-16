import axios from 'axios'
import { config } from '../config'

export async function reserveProperty(propertyId, fromDate, toDate, total) {
  try {
    const url = `${config.serverURL}/booking`
    const token = sessionStorage.getItem('token')
    const body = { propertyId, total, fromDate, toDate }
    const response = await axios.post(url, body, {
      headers: { token },
    })
    if (response.status == 200) {
      return response.data
    }
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}

export async function getBookings() {
  try {
    const url = `${config.serverURL}/booking`
    const token = sessionStorage.getItem('token')
    const response = await axios.get(url, {
      headers: { token },
    })
    if (response.status == 200) {
      return response.data
    }
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}
