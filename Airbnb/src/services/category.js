import axios from 'axios'
import { config } from '../config'

export async function getCategories() {
  try {
    // create url
    const url = `${config.serverURL}/category`

    // get the token
    const token = sessionStorage.getItem('token')

    // send the request and get the response
    const response = await axios.get(url, {
      headers: { token },
    })

    // check if the response is OK
    if (response.status == 200) {
      return response.data
    } else {
      return null
    }
  } catch (ex) {
    console.log('exception: ', ex)
  }
}
