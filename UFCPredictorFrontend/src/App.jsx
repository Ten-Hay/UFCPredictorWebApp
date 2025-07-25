import './App.css'
import Home from './components/pages/home/home'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Predict from './components/pages/predict/predict'
import Test from './components/pages/test/test'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>

    </>
  )

}

export default App
