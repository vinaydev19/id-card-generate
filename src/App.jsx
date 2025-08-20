import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './Home'
import AadhaarCardForm from './AadhaarCard/AadhaarCardForm'
import AadhaarCardGenerator from './AadhaarCard/AadhaarCardGenerator'
import PanCardForm from "./PenCard/PanCardForm"
import PanCardGenerator from "./PenCard/PanCardGenerator"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/aadhaar-card" element={<AadhaarCardForm />} />
        <Route path="/aadhaar-card/generator" element={<AadhaarCardGenerator />} />
        <Route path="/pan-card" element={<PanCardForm />} />
        <Route path="/pan-card/generator" element={<PanCardGenerator />} />
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
