import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Board from "./Board";
import SellDetail from "./SellDetail";
import SellCreate from "./SellCreate";
import SellModify from "./SellModify";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <BrowserRouter>
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged} />
      <div className = "container my-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login isLogged={isLogged} setIsLogged={setIsLogged} />} />
          <Route path="/board" element={<Board/>}/>
          <Route path="/sell-create" element={<SellCreate/>}/>
          <Route path="/sell-modify/:id" element={<SellModify/>}/>
          <Route path="/board/:id" element={<SellDetail/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
