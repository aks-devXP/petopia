import { Route, Routes } from 'react-router-dom'
import './App.css'
import Template from './Components/template'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
function App() {

  return (
    <div>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>

      <Route path="/" element={<Template/>}  >
        
        <Route index element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />

      </Route>
      
    </Routes>
    </div>
    
  )
}

export default App
