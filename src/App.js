import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "../src/components/Menu";
import Pacientes from "./components/Pacientes";
import Doctores from "./components/Doctores";
import HistoriaC from "./components/HistoriaC";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import cm from "./img/CM.jpg";

function App() {
  return (
    <BrowserRouter>
      <Menu></Menu>

      <div>
        <h1 className="h1 text-center my-4">
          CLINICA MAYO - HISTORIAS CLINICAS
          <img src={cm} alt="" />
        </h1>
      </div>
      <Routes>
        <Route path="/pacientes" Component={Pacientes}></Route>
        <Route path="/doctores" Component={Doctores}></Route>
        <Route path="/historiaC" Component={HistoriaC}></Route>
        <Route path="/" Component={Home}></Route>
        <Route path="*" Component={NotFound}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
