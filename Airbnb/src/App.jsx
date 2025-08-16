import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import MyProperties from './pages/property/MyProperties'
import PropertyDetails from './pages/property/PropertyDetails'
import Profile from './pages/user/Profile'
import AboutUs from './pages/utils/AboutUs'
import ContactUs from './pages/utils/ContactUs'
import AddProperty from './pages/property/AddProperty'
import Properties from './pages/property/Properties'
import { ToastContainer } from 'react-toastify'
import { AuthContext } from './contexts/auth.context'
import Wishlist from './pages/wishlish/wishlist'
import Bookings from './pages/bookings/Bookings'

function App() {
  // create a state member for keeping user details
  const [user, setUser] = useState(null)

  return (
    <>
      <AuthContext value={{ user, setUser }}>
        <Routes>
          <Route
            path='/'
            element={<Login />}
          />
          <Route
            path='register'
            element={<Register />}
          />
          <Route
            path='home'
            element={user ? <Home /> : <Navigate to='/' />}
          >
            <Route
              path='properties'
              element={<Properties />}
            />
            <Route
              path='my-properties'
              element={<MyProperties />}
            />
            <Route
              path='property-details'
              element={<PropertyDetails />}
            />
            <Route
              path='profile'
              element={<Profile />}
            />
            <Route
              path='about-us'
              element={<AboutUs />}
            />
            <Route
              path='contact-us'
              element={<ContactUs />}
            />
            <Route
              path='add-property'
              element={<AddProperty />}
            />
            <Route
              path='wishlist'
              element={<Wishlist />}
            />
            <Route
              path='bookings'
              element={<Bookings />}
            />
          </Route>
        </Routes>
      </AuthContext>

      <ToastContainer />
    </>
  )
}

export default App
