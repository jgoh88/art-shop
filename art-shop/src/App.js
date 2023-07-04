import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from "./components/Home";
import { UserProvider } from './hooks/useUserHook';
import { CartProvider } from './hooks/useCartHook';
import MyArt from "./components/myArt";
import Logout from './components/Logout';
import Cart from './components/Cart';
import CheckedOut from './components/CheckedOut';



function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path={'/signup'} element={<Signup />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/logout/:token'} element={<Logout /> } />
            <Route path={'/cart'} element={<Cart />} />
            <Route path={'/cart/checkout'} element={<CheckedOut />} />
            <Route path={"/"} element={<Home />} />
            <Route path={"/myart"} element={<MyArt />} />
          </Routes>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
