import React, { useEffect, useState } from "react";

import Mapa from "./Mapa";

export default function Farmacias() {
  //Estado
  const [farmacias, setFarmacias] = useState([]);
  const [search, setSearch] = useState("");

  /*************************************CONSUMO DE API FARMACIAS DE TURNO*************************************** */
  // URL DATOS FARMACIAS
  const url = "https://midas.minsal.cl/farmacia_v2/WS/getLocalesTurnos.php";

  //FUNCION PARA CONSUMIR URL
  const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setFarmacias(data);
  };

  useEffect(() => {
    getData();
  }, []);
  /************************************************************************************************************** */
  //Búsqueda de datos
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
/******************************************************************************************************************** */
  
/*************FILTRADO DE LOS DATOS Y ORDENAMIENTO CON EL METODO SORT A-Z*/
  let results = [];
  if (!search) {
    results = farmacias.sort(function (a, b){//UTILIZACION METODO SORT
      return ( a.comuna_nombre.toLowerCase().localeCompare(b.comuna_nombre.toLowerCase()))
  });
  } else {
    results = farmacias.filter((farmacia) =>
      farmacia.local_nombre.toLowerCase().includes(search.toLowerCase())
    );
  }
/**************************************************************************************************************** */
  return (
    <>
    <div className="ContentBuscador">
    <div className="buscador">
        <input
          type="text"
          placeholder="search"
          className="form-control"
          value={search}
          onChange={handleSearch}
        />
      </div>
    </div>
      <div className="Contend">
      {results.map((farmacias) => (
        <div className="carta">
          <div className="imagen">
          <Mapa cordenadas={[farmacias.local_lat,farmacias.local_lng]}></Mapa>
          </div>
          <div className="conten">
           <h4>{farmacias.comuna_nombre}</h4>
           <span>Local: {farmacias.local_nombre}</span>
            <br></br>
            <span>Dirección: {farmacias.local_direccion} </span><br></br>
            <span>Telefono: {farmacias.local_telefono != "" ? farmacias.local_telefono : "Sin registro"}</span><br></br>
            <span>Día Funcionamiento: {farmacias.funcionamiento_dia}</span><br></br>
            <span>Horacio Apertura: {farmacias.funcionamiento_hora_apertura}</span><br></br>
            <span>Horacio Cierre: {farmacias.funcionamiento_hora_cierre}</span><br></br>
          </div>
        </div>
      ))}
      </div>
    </>
  );
}
