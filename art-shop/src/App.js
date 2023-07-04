import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from "./components/Home";
import { UserProvider } from './hooks/useUserHook';
import MyArt from "./components/myArt";
import Logout from './components/Logout';



function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path={'/signup'} element={<Signup />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/logout/:token'} element={<Logout /> } />
          <Route path={"/"} element={<Home />} />
          <Route path={"/myart"} element={<MyArt />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
