import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getMyProperties as getMyPropertiesFromServer } from '../../services/property'
import Property from '../../components/Property'

function MyProperties() {
  // all properties
  const [properties, setProperties] = useState([])

  const getAllProperties = async () => {
    const result = await getMyPropertiesFromServer()
    if (!result) {
      toast.error('Error while loading my properties')
    } else {
      if (result['status'] == 'success') {
        setProperties(result['data'])
        console.log(result['data'])
      } else {
        toast.error(result['error'])
      }
    }
  }

  useEffect(() => {
    getAllProperties()
  }, [])

  return (
    <>
      <div className='container'>
        <h2 className='page-header'>My Properties</h2>
        <Link
          className='btn btn-warning'
          to='/home/add-property'
        >
          Add Property
        </Link>

        <div className='row mt-3'>
          {properties.map((property) => {
            return (
              <Property
                isMyProperty={true}
                property={property}
                key={property['id']}
                onDeleteProperty={() => {
                  getAllProperties()
                }}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default MyProperties
