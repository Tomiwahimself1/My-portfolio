import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Myportfolio from './My'
import WeatherApp from './Weather'
import TaskManager from './Task'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/my-portfolio" element={<Myportfolio />} />
      <Route path="/weather" element={<WeatherApp />} />
      <Route path="/task" element={<TaskManager />} />
    </Route>


  )
)

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}



