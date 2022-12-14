import React, { useState, useEffect } from "react";
import { getLastDocumentOfTheCollection } from "../Firebase/firebase.config";

const Report = () => {
  const [data, setData] = useState(null);
  console.log(data, "data");

  useEffect(() => {
    getLastDocumentOfTheCollection(setData);
  }, []);

  return (
    <div className="table-wrapper">
      <h5>{data?.nombreReport}</h5>
      <table className="containerTable">
        <thead>
          <tr>
            <th>{data?.filas?.fila1.campo}</th>
            <th className={data?.filas?.fila2.campo === "" ? "hide" : ""}>
              {data?.filas?.fila2.campo}
            </th>
            <th className={data?.filas?.fila3.campo === "" ? "hide" : ""}>
              {data?.filas?.fila3.campo}
            </th>
            <th className={data?.filas?.fila4.campo === "" ? "hide" : ""}>
              {data?.filas?.fila4.campo}
            </th>
            <th className={data?.filas?.fila5.campo === "" ? "hide" : ""}>
              {data?.filas?.fila5.campo}
            </th>
            {data?.columnas?.columna1.filtro.map((columns, i) => {
              return columns === "" ? (
                <th key={i}></th>
              ) : (
                <th key={i}>{columns}</th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {data?.filas?.fila1.filtro.map((rows, i) => (
                <tr key={i}>{rows}</tr>
              ))}
            </td>
            <td className={data?.filas?.fila2.campo === "" ? "hide" : ""}>
              {data?.filas?.fila2.filtro.map((rows2, i) => (
                <tr key={i}>{rows2}</tr>
              ))}
            </td>
            <td className={data?.filas?.fila3.campo === "" ? "hide" : ""}>
              {data?.filas?.fila3.filtro.map((rows3, i) => (
                <tr key={i}>{rows3}</tr>
              ))}
            </td>
            <td className={data?.filas?.fila4.campo === "" ? "hide" : ""}>
              {data?.filas?.fila4.filtro.map((rows4, i) => (
                <tr key={i}>{rows4}</tr>
              ))}
            </td>
            <td className={data?.filas?.fila5.campo === "" ? "hide" : ""}>
              {data?.filas?.fila5.filtro.map((rows5, i) => (
                <tr key={i}>{rows5}</tr>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Report;
