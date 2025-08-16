import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getPropertyDetails as getPropertyDetailsFromServer } from '../../services/property'
import { toast } from 'react-toastify'
import { config } from '../../config'
import {
  Wifi,
  PCircle,
  EggFried,
  CupStraw,
  Snow2,
  Tv,
  Water,
} from 'react-bootstrap-icons'
import './PropertyDetails.css'
import { reserveProperty as reservePropertyFromServer } from '../../services/bookings'
// import moment from 'moment'

function PropertyDetails() {
  const [details, setDetails] = useState(null)
  const [amenities, setAmenities] = useState([])
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const reserveProperty = async () => {
    if (fromDate.length == 0) {
      toast.warning('please select check-in date ')
    } else if (toDate.length == 0) {
      toast.warning('please select check-out date ')
    } else {
      // if (moment(fromDate).diff(moment()) <0) {

      // }

      const result = await reservePropertyFromServer(
        details['id'],
        fromDate,
        toDate,
        details['rent']
      )
      if (!result) {
        toast.error('Error while reserving the property ')
      } else {
        if (result['status'] == 'success') {
          toast.success('Successfully reserved property')
        } else {
          toast.error(result['error'])
        }
      }
    }
  }

  const getPropertyDetails = async (id) => {
    const result = await getPropertyDetailsFromServer(id)
    if (!result) {
      toast.error('Error while loading property details')
    } else {
      if (result['status'] == 'success') {
        const amenities = []
        const data = result['data']
        if (data['isWifi'] == 1)
          amenities.push({
            key: 'isWifi',
            image: <Wifi />,
            title: 'Wifi Available',
          })
        if (data['isLakeView'] == 1)
          amenities.push({
            key: 'isLakeView',
            image: <Water />,
            title: 'Lake view',
          })
        if (data['isTV'] == 1)
          amenities.push({
            key: 'isTV',
            image: <Tv />,
            title: 'TV Available',
          })
        if (data['isAC'] == 1)
          amenities.push({
            key: 'isAC',
            image: <Snow2 />,
            title: 'AC Available',
          })
        if (data['isMiniBar'] == 1)
          amenities.push({
            key: 'isMiniBar',
            image: <CupStraw />,
            title: 'Minibar Available',
          })
        if (data['isBreakfast'] == 1)
          amenities.push({
            key: 'isBreakfast',
            image: <EggFried />,
            title: 'Breakfast Available',
          })
        if (data['isParking'] == 1)
          amenities.push({
            key: 'isParking',
            image: <PCircle />,
            title: 'Parking Available',
          })

        console.log(amenities)
        setAmenities(amenities)
        setDetails(data)

        console.log(result['data'])
      } else {
        toast.error(result['error'])
      }
    }
  }

  // get the location object
  const location = useLocation()

  useEffect(() => {
    // get the details sent by previous page
    const { id } = location.state

    // get the property details
    getPropertyDetails(id)
  }, [])

  const getImageUrl = () => {
    return `${config.serverURL}/${details['profileImage']}`
  }
  return (
    <>
      {details && (
        <div className='container'>
          <h2 className='mt-3 mb-3'>{details['title']}</h2>

          <img
            className='mb-3'
            src={getImageUrl()}
            alt=''
          />

          <div className='row'>
            <div className='col-8'>
              <h3>{details['address']}</h3>
              <div>
                <span>{details['guests']} guests</span> |{' '}
                <span>{details['bedrooms']} bedrooms</span> |{' '}
                <span>{details['beds']} beds</span> |{' '}
                <span>{details['bathrooms']} bathrooms</span>
              </div>

              <div className='row mt-4'>
                <div className='col-8'>
                  <div>Hosted by {details['ownerName']}</div>
                  <div className='mb-3'>Superhost 11 years hosting</div>
                  <hr />
                  <div className='mb-3'>{details['details']}</div>
                  <hr />
                  <h3>What this place offers</h3>
                  <div className='row mt-3'>
                    <div className='col'>
                      {amenities.map((amenity) => {
                        return (
                          <div
                            key={amenity['key']}
                            className='mt-1 mb-2'
                          >
                            {amenity['image']}
                            <span className='ms-3'>{amenity['title']}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-4'>
              <div className='box'>
                <h4>₹{details['rent']} per night</h4>
                <div className='row mt-3'>
                  <div className='col'>
                    <label htmlFor=''>Check-in date</label>
                    <input
                      onChange={(e) => setFromDate(e.target.value)}
                      type='date'
                      className='form-control mt-2'
                    />
                  </div>
                  <div className='col'>
                    <label htmlFor=''>Check-out date</label>
                    <input
                      onChange={(e) => setToDate(e.target.value)}
                      type='date'
                      className='form-control mt-2'
                    />
                  </div>
                </div>

                <button
                  onClick={reserveProperty}
                  className='reserve mt-3'
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PropertyDetails
