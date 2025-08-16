import React, { useEffect } from 'react'
import { useState } from 'react'
import { getBookings as getBookingsFromServer } from '../../services/bookings'
import { toast } from 'react-toastify'
import Booking from '../../components/Booking'

function Bookings() {
  // list of bookings
  const [bookings, setBookings] = useState([])

  const getBookings = async () => {
    const result = await getBookingsFromServer()
    if (!result) {
      toast.error('Error while getting your bookings')
    } else {
      if (result['status'] == 'success') {
        setBookings(result['data'])
      }
    }
  }

  useEffect(() => {
    getBookings()
  }, [])

  return (
    <div className='container'>
      <h2 className='page-header'>My Bookings</h2>
      {bookings.length == 0 && (
        <h4 className='page-header'>There are no bookings at the moment</h4>
      )}
      {bookings.length > 0 && (
        <div>
          {bookings.map((booking) => {
            return (
              <Booking
                key={booking['id']}
                booking={booking}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Bookings
