import React from 'react'
import { config } from '../config'
import { useNavigate } from 'react-router-dom'
import { deleteProperty } from '../services/property'
import { toast } from 'react-toastify'
import { HeartFill } from 'react-bootstrap-icons'
import './Property.css'
import { useDispatch } from 'react-redux'
import { addToWishlist } from '../features/wishlist.slice'

function Property({ property, isMyProperty, onDeleteProperty }) {
  const image = `${config.serverURL}/${property['profileImage']}`

  // get navigate function reference
  const navigate = useNavigate()
  const onDetails = () => {
    // go to the property details screen
    // along with the selected property (state)
    navigate('/home/property-details', { state: property })
  }

  // delete selected property
  const onDelete = async () => {
    const result = await deleteProperty(property['id'])
    if (!result) {
      toast.error('Error while deleting property')
    } else {
      if (result['status'] == 'success') {
        toast.success('Successfully deleted property')

        // let the parent know that the property is deleted
        // and re-render the component
        onDeleteProperty()
      } else {
        toast.error(result['error'])
      }
    }
  }

  // get the dispatch function reference
  const dispatch = useDispatch()

  // add the property to wishlist
  const onAddWishlist = () => {
    // send addToWishlist action
    // property: is called as payload
    // payload is the argument passed to the action
    dispatch(addToWishlist(property))
  }

  return (
    <div className='col-3'>
      <div className='card'>
        {!isMyProperty && (
          <button
            onClick={onAddWishlist}
            className='heart'
          >
            <HeartFill size={30} />
          </button>
        )}
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
          {isMyProperty && (
            <button
              onClick={onDelete}
              className='btn btn-danger btn-sm'
            >
              delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Property
