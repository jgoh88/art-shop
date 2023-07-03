import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from "./components/Home";
import MyArt from "./components/myArt";


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={"/"} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
