import React, { useEffect, useState } from 'react'
import { getCategories as getCategoriesFromServer } from '../../services/category'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { uploadProperty } from '../../services/property'

function AddProperty() {
  const [categories, setCategories] = useState([])
  const [image, setImage] = useState(null)
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    // check if user has selected an image
    if (image) {
      // create an image from the selected file
      setPhoto(URL.createObjectURL(image))
    }
  }, [image])

  const [info, setInfo] = useState({
    categoryId: -1,
    title: '',
    details: '',
    address: '',
    contactNumber: '',
    ownerName: '',
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
    rent: 0,
    guests: 0,
    isLakeView: 0,
    isTV: 0,
    isAC: 0,
    isWifi: 0,
    isMiniBar: 0,
    isBreakfast: 0,
    isParking: 0,
  })

  // get navigate function reference
  const navigate = useNavigate()

  const onSave = async () => {
    if (info.title.length == 0) {
      toast.error('please enter title')
    } else if (info.details.length == 0) {
      toast.error('please enter details')
    } else if (info.address.length == 0) {
      toast.error('please enter address')
    } else if (info.ownerName.length == 0) {
      toast.error('please enter owner name')
    } else if (info.contactNumber.length == 0) {
      toast.error('please enter contact number')
    } else {
      const {
        categoryId,
        title,
        details,
        address,
        contactNumber,
        ownerName,
        bedrooms,
        beds,
        bathrooms,
        rent,
        guests,
        isLakeView,
        isTV,
        isAC,
        isWifi,
        isMiniBar,
        isBreakfast,
        isParking,
      } = info
      const result = await uploadProperty(
        categoryId,
        title,
        details,
        address,
        contactNumber,
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
      )
      if (!result) {
        toast.error('Error while adding a property')
      } else {
        if (result['status'] == 'success') {
          toast.success('Successfully added property')

          // go back to the previous screen
          navigate(-1)
        } else {
          toast.error(result['error'])
        }
      }
    }
  }

  // load the categories
  const getCategories = async () => {
    const result = await getCategoriesFromServer()
    if (!result) {
      toast.error('Error while loading categories')
    } else {
      if (result['status'] == 'success') {
        setCategories(result['data'])
      } else {
        toast.error(result['error'])
      }
    }
  }

  useEffect(() => {
    // get categories as soon as this component loads
    getCategories()
  }, [])

  return (
    <>
      <div className='container'>
        <h2 className='page-header'>Add Property</h2>
        <div className='form'>
          <div className='row mb-3'>
            <div className='col'>
              <label htmlFor=''>Category</label>
              <select
                onChange={(e) =>
                  setInfo({ ...info, categoryId: e.target.value })
                }
                className='form-control'
              >
                {categories.map((category) => {
                  return (
                    <option
                      key={category['id']}
                      value={category['id']}
                    >
                      {category['title']}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className='col'>
              <label htmlFor=''>Title</label>
              <input
                onChange={(e) => setInfo({ ...info, title: e.target.value })}
                type='text'
                className='form-control'
              />
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col'>
              <label htmlFor=''>Details</label>
              <textarea
                onChange={(e) => setInfo({ ...info, details: e.target.value })}
                className='form-control'
                rows={3}
              ></textarea>
            </div>
            <div className='col'>
              <label htmlFor=''>Address</label>
              <textarea
                onChange={(e) => setInfo({ ...info, address: e.target.value })}
                className='form-control'
                rows={3}
              ></textarea>
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col'>
              <label htmlFor=''>Owner Name</label>
              <input
                onChange={(e) =>
                  setInfo({ ...info, ownerName: e.target.value })
                }
                type='text'
                className='form-control'
              />
            </div>

            <div className='col'>
              <label htmlFor=''>Contact Number</label>
              <input
                onChange={(e) =>
                  setInfo({ ...info, contactNumber: e.target.value })
                }
                maxLength={10}
                type='tel'
                className='form-control'
              />
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col'>
              <div className='row'>
                <div className='col'>
                  <div className='row g-3 align-items-center'>
                    <div className='col-auto'>
                      <input
                        type='checkbox'
                        onChange={(e) =>
                          setInfo({
                            ...info,
                            isLakeView: e.target.checked ? 1 : 0,
                          })
                        }
                      />
                    </div>
                    <div className='col-auto'>
                      <label className='col-form-label'>Lake View</label>
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <div className='row g-3 align-items-center'>
                    <div className='col-auto'>
                      <input
                        type='checkbox'
                        onChange={(e) =>
                          setInfo({
                            ...info,
                            isTV: e.target.checked ? 1 : 0,
                          })
                        }
                      />
                    </div>
                    <div className='col-auto'>
                      <label className='col-form-label'>TV Available</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <div className='row g-3 align-items-center'>
                    <div className='col-auto'>
                      <input
                        type='checkbox'
                        onChange={(e) =>
                          setInfo({
                            ...info,
                            isAC: e.target.checked ? 1 : 0,
                          })
                        }
                      />
                    </div>
                    <div className='col-auto'>
                      <label className='col-form-label'>AC Available</label>
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <div className='row g-3 align-items-center'>
                    <div className='col-auto'>
                      <input
                        type='checkbox'
                        onChange={(e) =>
                          setInfo({
                            ...info,
                            isWifi: e.target.checked ? 1 : 0,
                          })
                        }
                      />
                    </div>
                    <div className='col-auto'>
                      <label className='col-form-label'>WiFi Available</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <div className='row g-3 align-items-center'>
                    <div className='col-auto'>
                      <input
                        type='checkbox'
                        onChange={(e) =>
                          setInfo({
                            ...info,
                            isMiniBar: e.target.checked ? 1 : 0,
                          })
                        }
                      />
                    </div>
                    <div className='col-auto'>
                      <label className='col-form-label'>
                        Minibar Available
                      </label>
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <div className='row g-3 align-items-center'>
                    <div className='col-auto'>
                      <input
                        type='checkbox'
                        onChange={(e) =>
                          setInfo({
                            ...info,
                            isBreakfast: e.target.checked ? 1 : 0,
                          })
                        }
                      />
                    </div>
                    <div className='col-auto'>
                      <label className='col-form-label'>
                        Breakfast Available
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <div className='row g-3 align-items-center'>
                    <div className='col-auto'>
                      <input
                        type='checkbox'
                        onChange={(e) =>
                          setInfo({
                            ...info,
                            isParking: e.target.checked ? 1 : 0,
                          })
                        }
                      />
                    </div>
                    <div className='col-auto'>
                      <label className='col-form-label'>
                        Parking Available
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col'>
              <div className='row'>
                <div className='col'>
                  <label htmlFor=''>#Guests</label>
                  <input
                    onChange={(e) =>
                      setInfo({ ...info, guests: e.target.value })
                    }
                    type='number'
                    className='form-control'
                  />
                </div>
              </div>

              <div className='row'>
                <div className='col'>
                  <label htmlFor=''>#Bedrooms</label>
                  <input
                    onChange={(e) =>
                      setInfo({ ...info, bedrooms: e.target.value })
                    }
                    type='number'
                    className='form-control'
                  />
                </div>
              </div>

              <div className='row'>
                <div className='col'>
                  <label htmlFor=''>#Beds</label>
                  <input
                    onChange={(e) => setInfo({ ...info, beds: e.target.value })}
                    type='number'
                    className='form-control'
                  />
                </div>
              </div>

              <div className='row'>
                <div className='col'>
                  <label htmlFor=''>#Bathrooms</label>
                  <input
                    onChange={(e) =>
                      setInfo({ ...info, bathrooms: e.target.value })
                    }
                    type='number'
                    className='form-control'
                  />
                </div>
              </div>

              <div className='row'>
                <div className='col'>
                  <label htmlFor=''>Rent</label>
                  <input
                    onChange={(e) => setInfo({ ...info, rent: e.target.value })}
                    type='number'
                    className='form-control'
                  />
                </div>
              </div>
            </div>

            <div className='col'>
              <label htmlFor=''>Select Photo</label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type='file'
                className='form-control'
              />
              <div>
                {photo && (
                  <img
                    src={photo}
                    style={{
                      marginTop: 25,
                      width: '100%',
                      height: 225,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className='mt-2'>
          <button
            onClick={onSave}
            className='btn btn-success'
          >
            Save
          </button>
          <button
            onClick={() => navigate(-1)}
            className='btn btn-danger ms-2'
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}

export default AddProperty
