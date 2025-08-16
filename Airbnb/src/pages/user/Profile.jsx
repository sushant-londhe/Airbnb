import React, { useEffect, useState } from 'react'
import { getProfile, updateProfile } from '../../services/user'
import { toast } from 'react-toastify'

function Profile() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const onGetProfile = async () => {
    const result = await getProfile()
    if (!result) {
      toast.error('Error while loading profile')
    } else {
      if (result['status'] == 'success') {
        const { firstName, lastName, email, phoneNumber } = result['data']
        setFirstName(firstName)
        setLastName(lastName)
        setEmail(email)
        setPhone(phoneNumber)
      } else {
        toast.error(result['error'])
      }
    }
  }

  useEffect(() => {
    // this function gets called as soon as this component gets mounted
    onGetProfile()
  }, [])

  const onUpdate = async () => {
    console.log(firstName)
    if (firstName.length == 0) {
      toast.warn('please enter first name')
    } else if (lastName.length == 0) {
      toast.warn('please enter last name')
    } else if (phone.length == 0) {
      toast.warn('please enter phone number')
    } else {
      const result = await updateProfile(firstName, lastName, phone)

      if (!result) {
        toast.error('Error while updating profile')
      } else {
        if (result['status'] == 'success') {
          toast.success('Successfully updated profile')
        } else {
          toast.error(result['error'])
        }
      }
    }
  }

  return (
    <>
      <div className='container'>
        <h2 className='page-header'>Profile</h2>

        <div className='form'>
          <div className='mb-3'>
            <label htmlFor=''>First Name</label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type='text'
              className='form-control'
              value={firstName}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor=''>Last Name</label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              type='text'
              className='form-control'
              value={lastName}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor=''>Email</label>
            <input
              readOnly
              type='email'
              disabled
              className='form-control'
              value={email}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor=''>Phone Number</label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type='tel'
              className='form-control'
              value={phone}
            />
          </div>

          <div className='mb-3'>
            <button
              onClick={onUpdate}
              className='btn btn-success'
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
