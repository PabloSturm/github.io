import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import cm from "../img/CM.jpg";
function Home() {
  return (
    <div>
      <img src={cm} alt="" />
      <h1 className="h1 text-center my-4">LA MEJOR CLINICA DEL PAIS</h1>;
    </div>
  );
}

export default Home;
