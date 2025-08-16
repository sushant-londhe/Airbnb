import React from 'react'
import { useSelector } from 'react-redux'
import WishlistItem from '../../components/WishlistItem'

function Wishlist() {
  // get the items present in wishlist properties collection
  const { items } = useSelector((store) => store.wishlist)

  return (
    <div className='container'>
      <h2 className='page-header'>Wishlist</h2>
      {items.length == 0 && (
        <h4 className='page-header'>The wishlist is empty at the moment</h4>
      )}

      {items.length > 0 && (
        <div className='row'>
          {items.map((property) => {
            return (
              <WishlistItem
                property={property}
                key={property['id']}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Wishlist
