import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/login'} element={<Login />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
