import React from 'react'
import { config } from '../config'
import './Booking.css'
import moment from 'moment'

function Booking({ booking }) {
  const image = `${config.serverURL}/${booking['profileImage']}`

  const formatDate = (date) => {
    return moment(date).format('MMM DD, YYYY')
  }

  return (
    <div className='booking-item d-flex'>
      <div>
        <img
          src={image}
          alt=''
          style={{ width: 100, height: 100 }}
        />
      </div>
      <div className='ms-3'>
        <h5>{booking['title']}</h5>
        <div>Booking date: {formatDate(booking['createdTimestamp'])}</div>
        <div>Check-in date: {formatDate(booking['fromDate'])}</div>
        <div>Check-out date: {formatDate(booking['toDate'])}</div>
      </div>
    </div>
  )
}

export default Booking
