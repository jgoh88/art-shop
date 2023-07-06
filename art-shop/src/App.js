import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from "./components/Home";
import { UserProvider, useUserHook } from './hooks/useUserHook';
import { CartProvider } from './hooks/useCartHook';
import MyArt from "./components/myArt";
import Logout from './components/Logout';
import Cart from './components/Cart';
import CheckedOut from './components/CheckedOut';
import Search from './components/Search';
import Profile from './components/Profile';
import About from './components/About';

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
            <Route path={'/about'} element={<About />} />
            <Route path={'/cart'} element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path={'/cart/checkout'} element={
              <ProtectedRoute>
                <CheckedOut />
              </ProtectedRoute>
            } />
            <Route path={"/"} element={<Home />} />
            <Route path={"/search"} element={<Search />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"/myart"} element={
              <ProtectedRoute>
                <MyArt />
              </ProtectedRoute>
            } />
          </Routes>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

function ProtectedRoute({children}) {
  const userHook = useUserHook()
  if(!userHook.getUser()) {
    return <Navigate to='/login' replace />
  }
  return children
}

export default App;
