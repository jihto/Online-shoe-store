import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './conponents/Navbar/Navbar'
import './index.css'
import React from 'react'; 
import SellerNavbar from './conponents/Navbar/SellerNavbar';

import Home from './pages/user/Home'; 
import Shopping from './pages/user/Shopping'
import Cart from "./pages/user/Cart";
import ProductDetail from './pages/user/ProductDetail';
// import NotFound from 
import SellerLogin from './pages/sellers/SellerLogin';
import SellerHome from './pages/sellers/SellerHome';
import Account from './pages/sellers/Account'; 
import Summaries from './pages/sellers/Summaries';
import ChangeProduct from './pages/sellers/ChangeProduct'; 
import User from './pages/user/ProfileUser';
import LoginModal from './conponents/modals/LoginModal'; 
import OrderModal from './conponents/modals/OrderModal';
import useOrderModal from './hooks/useOrderModal';
import { ToastContainer } from 'react-toastify';
import Trash from './pages/sellers/Trash'; 

export interface IApplicationProps{}  
 
const App: React.FunctionComponent<IApplicationProps> = () => {    
  const orderModal = useOrderModal();
    return ( 
      <BrowserRouter>    
        <Routes>
          <Route path="/user/*" element={<Navbar/>} />
          <Route path="/admin/*" element={<SellerNavbar/>} />
        </Routes>
        <Routes> 
          <Route path="/user" element={<Home/>}/>
          <Route path="/user/shopping" element={<Shopping/>}/>  
          <Route path="/user/cart" element={<Cart/>}/> 
          <Route path="/user/profile" element={<User/>}/> 
          <Route path="/user/product/detail/:id" element={<ProductDetail/>}/> 
        </Routes>    
        <Routes>
          <Route path="/login" element={<SellerLogin/>}/>  
          <Route path="/admin/home" element={<SellerHome/>}/> 
          <Route path="/admin/product/detail/:id" element={<ChangeProduct/>}/>
          <Route path="/admin/account" element={<Account/>}/> 
          <Route path="/admin/trash" element={<Trash/>}/>   
          <Route path="/admin/summaries" element={<Summaries/>}/>
          
          {/* <Route path="*" element={<NotFound/>}/>         */}
        </Routes>
        <LoginModal/>    
        { orderModal.isOpen ? <OrderModal /> : null}
        <ToastContainer position='bottom-right'/>
      </BrowserRouter>
    )
}

export default App
