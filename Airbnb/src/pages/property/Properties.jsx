import React, { useEffect, useState } from 'react'
import { getAllProperties as getAllPropertiesFromServer } from '../../services/property'
import { toast } from 'react-toastify'
import Property from '../../components/Property'
import { Search } from 'react-bootstrap-icons'

function Properties() {
  // all properties
  const [properties, setProperties] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const getAllProperties = async () => {
    const result = await getAllPropertiesFromServer(searchTerm)
    if (!result) {
      toast.error('Error while loading all properties')
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

  useEffect(() => {
    getAllProperties()
  }, [searchTerm])

  return (
    <>
      <div className='container'>
        <h2 className='page-header'>Properties</h2>

        <div style={{ padding: 20, textAlign: 'center' }}>
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: 10,
              paddingLeft: 20,
              borderRadius: 20,
              width: 400,
              fontSize: 18,
            }}
            type='text'
            placeholder='search properties by title'
          />
        </div>

        <div className='row'>
          {properties.map((property) => {
            return (
              <Property
                isMyProperty={false}
                property={property}
                key={property['id']}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Properties
