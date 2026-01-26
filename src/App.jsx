import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Home from "./pages/Home"
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Login from "./pages/Login"
import Checkout from './pages/Checkout'
import Admin from './pages/Admin'

const App = () => {
  const Layout = ({children}) => {
    const location = useLocation()
    const isAdminRoute = location.pathname.startsWith('/admin')

    return (
      <div className="app-container">
        {!isAdminRoute && <Navbar/>}
        <main style={{flex: 1}}>
          {children}
        </main>
        {!isAdminRoute && <Footer/>}
      </div>
    )
  }
  return (
    <Layout>
      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path="/shop" element = {<Shop/>}/>
        <Route path="/about" element = {<About/>}/>
        <Route path="/contact" element = {<Contact/>}/>
        <Route path="/cart" element = {<Cart/>}/>
        <Route path="/login" element= {<Login/>}/>
        <Route path="/checkout" element= {<Checkout/>}/>
        <Route path="/admin" element = {<Admin/>}/>
      </Routes>
    </Layout>
    
  )
}

export default App
