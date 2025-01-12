import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import VetHome from "./pages/VetHome"
import Blog from "./pages/Blog"
import Volunteer from "./pages/Volunteer"
import MainLayout from './Layout/MainLayout'

function App() {
    const router = createBrowserRouter(createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>}></Route>
        <Route path="/vet" element={<VetHome/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='sign-up' element={<Signup/>}></Route>
        <Route path="/volunteer" element={<Volunteer/>}></Route>
        <Route path="/blog" element={<Blog/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
      </Route>
    ));
  
    return <RouterProvider router={router}></RouterProvider>
}

export default App
