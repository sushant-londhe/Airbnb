import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <>
      <Navbar />
      <main
        className='container'
        style={{ paddingBottom: 60 }}
      >
        <Outlet />
      </main>
      <footer className='footer'>copyright sunbeam@2025</footer>
    </>
  )
}

export default Home
