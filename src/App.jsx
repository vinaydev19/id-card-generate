import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import IDCardGenerator from './IDCardGenerator'
import AadhaarCard from './AadhaarCard'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './Home'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/aadhaar-card" element={<AadhaarCard />} />
        <Route path="/aadhaar-card/generator" element={<IDCardGenerator />} />
        {/* Add more routes as needed */}
      </>
    )
  )

  return (
    <>
      <div>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  )
}

export default App
