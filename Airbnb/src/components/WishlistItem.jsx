import React from 'react'
import { config } from '../config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { removeFromWishlist } from '../features/wishlist.slice'

function WishlistItem({ property }) {
  const image = `${config.serverURL}/${property['profileImage']}`

  // get navigate function reference
  const navigate = useNavigate()
  const onDetails = () => {
    // go to the property details screen
    // along with the selected property (state)
    navigate('/home/property-details', { state: property })
  }

  // get the dispatch function reference
  const dispatch = useDispatch()

  // delete selected property
  const onDelete = async () => {
    // send removeFromWishlist action
    dispatch(removeFromWishlist(property))

    toast.success('Successfully delete from wishlist')
  }

  return (
    <div className='col-3'>
      <div className='card'>
        <img
          src={image}
          className='card-img-top'
          alt=''
          style={{ height: 200 }}
        />
        <div className='card-body'>
          <h5 className='card-title'>{property['title']}</h5>
          <div>{property['address']}</div>
          <div>
            <span style={{ fontWeight: 'bold' }}>₹ {property['rent']}</span> per
            night
          </div>
        </div>
        <div className='card-footer d-flex justify-content-between'>
          <button
            onClick={onDetails}
            className='btn btn-success btn-sm'
          >
            details
          </button>

          <button
            onClick={onDelete}
            className='btn btn-danger btn-sm'
          >
            delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default WishlistItem
