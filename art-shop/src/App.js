import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from "./components/Home";
import { UserProvider, useUserHook } from './hooks/useUserHook';
import { CartProvider } from './hooks/useCartHook';
import Signout from './components/Signout';
import Cart from './components/Cart';
import CheckedOut from './components/CheckedOut';
import Search from './components/Search';
import Profile from './components/Profile';
import About from './components/About';
import MyArt from './components/MyArt';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path={'/signup'} element={<Signup />} />
            <Route path={'/signin'} element={<Signin />} />
            <Route path={'/signout/:token'} element={<Signout /> } />
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
    return <Navigate to='/signin' replace />
  }
  return children
}

export default App;
