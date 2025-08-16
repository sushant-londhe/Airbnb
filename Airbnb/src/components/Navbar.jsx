import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth.context'
import { useSelector } from 'react-redux'

function Navbar() {
  // get the items from wishlist slice (store)
  const { items } = useSelector((store) => store.wishlist)

  // get the navigate() function reference
  const navigate = useNavigate()

  // get setUser from AuthContext
  const { setUser } = useContext(AuthContext)

  const onLogout = () => {
    // remove all the caches values from sessionStorage
    sessionStorage.removeItem('firstName')
    sessionStorage.removeItem('lastName')
    sessionStorage.removeItem('token')

    // reset the user details in AuthContext
    setUser(null)

    // navigate to Login screen
    navigate('/')
  }

  return (
    <nav
      className='navbar navbar-expand-lg bg-primary'
      data-bs-theme='dark'
    >
      <div className='container-fluid'>
        <Link
          className='navbar-brand'
          to='/home'
        >
          MyAirbnb
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse'
          id='navbarNav'
        >
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link
                className='nav-link'
                aria-current='page'
                to='/home/properties'
              >
                Properties
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/home/my-properties'
              >
                My Properties
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/home/wishlist'
              >
                Wishlist({items.length})
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/home/bookings'
              >
                Bookings
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/home/profile'
              >
                Profile
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/home/about-us'
              >
                About Us
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/home/contact-us'
              >
                Contact Us
              </Link>
            </li>

            <li className='nav-item'>
              <button
                onClick={onLogout}
                className='btn'
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
