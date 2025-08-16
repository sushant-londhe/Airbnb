import axios from 'axios'
import { config } from '../config'

export async function deleteProperty(id) {
  try {
    const url = `${config.serverURL}/property/${id}`
    const token = sessionStorage.getItem('token')
    const response = await axios.delete(url, {
      headers: { token },
    })
    if (response.status == 200) {
      return response.data
    }
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}

export async function getPropertyDetails(id) {
  try {
    const url = `${config.serverURL}/property/details/${id}`
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

export async function getAllProperties(searchTerm) {
  try {
    let url = `${config.serverURL}/property`
    if (searchTerm.length > 0) {
      url += '?searchTerm=' + searchTerm
    }
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

export async function getMyProperties() {
  try {
    const url = `${config.serverURL}/property/my`
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

export async function uploadProperty(
  categoryId,
  title,
  details,
  address,
  contactNo,
  ownerName,
  isLakeView,
  isTV,
  isAC,
  isWifi,
  isMiniBar,
  isBreakfast,
  isParking,
  guests,
  bedrooms,
  beds,
  bathrooms,
  rent,
  image
) {
  try {
    const url = `${config.serverURL}/property`

    // sending the data using form-data
    const body = new FormData()
    body.append('categoryId', categoryId)
    body.append('title', title)
    body.append('details', details)
    body.append('address', address)
    body.append('contactNo', contactNo)
    body.append('ownerName', ownerName)
    body.append('isLakeView', isLakeView)
    body.append('isTV', isTV)
    body.append('isAC', isAC)
    body.append('isWifi', isWifi)
    body.append('isMiniBar', isMiniBar)
    body.append('isBreakfast', isBreakfast)
    body.append('isParking', isParking)
    body.append('guests', guests)
    body.append('bedrooms', bedrooms)
    body.append('beds', beds)
    body.append('bathrooms', bathrooms)
    body.append('rent', rent)
    body.append('photo', image)

    const token = sessionStorage.getItem('token')
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
