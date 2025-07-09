import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../styling/Home.css'
import NavBar from '../components/NavBar'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <h1> Benefit your Mental Health </h1>
    
      <p className="read-the-docs">
        Click on different categories to go to the pages
      </p>
    </>
  )
}

export default Home



