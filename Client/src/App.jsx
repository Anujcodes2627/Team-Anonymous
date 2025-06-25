import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AqiCard from './components/AqiCard'
import Navbar from './components/Navbar'
import NavigationCard from './components/NavigationCard'
import AQIMap from './components/AQIMap'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AQIMap />
        </div>
        <div className="relative z-10 mt-[200px] px-8">
          <AqiCard />
        </div>
      </div>

      <NavigationCard />
    </div>
  )
}

export default App
