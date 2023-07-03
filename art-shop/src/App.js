import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./components/Home";
import MyArt from "./components/myArt";


function App() {
  return (
     <BrowserRouter>
       <Routes>
         <Route
             path={"/"}
             element={<Home />}
         />
       </Routes>
     </BrowserRouter>
);
}

export default App;
