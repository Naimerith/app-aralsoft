import React, { useState } from "react";
import "../assets/styles/Container.css";
import { ReactSortable } from "react-sortablejs";
import ButtonApp from "./ButtonApp";
import { consultValuesInTheApi } from "../Functions/functions";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase.config";

const Container = () => {
  let ArrayOfSelectedButtons = [];

  const [row, setRow] = useState([]);
  const [column, setColumn] = useState([]);
  const [values, setValues] = useState([]);

  const addToArrayOfSelectedButtons = (button) => {
    if (button != null) {
      ArrayOfSelectedButtons.push(button.textContent);
    }
    return ArrayOfSelectedButtons;
  };
  const consultValues = async () => {
    const array1 = [];
    const array2 = [];
    const array3 = [];
    const consultApiSelectionRow = await consultValuesInTheApi(
      ArrayOfSelectedButtons[0]
    );
    consultApiSelectionRow.map((el) => {
      return el.map((h) => {
        const arrayFinal = h[1];
        return array1.push(arrayFinal);
      });
    });

    const consultApiSelectionColumn = await consultValuesInTheApi(
      ArrayOfSelectedButtons[1]
    );
    consultApiSelectionColumn.map((el) => {
      return el.map((h) => {
        const arrayFinal = h[1];
        return array2.push(arrayFinal);
      });
    });
    const consultApiSelectionValues = await consultValuesInTheApi(
      ArrayOfSelectedButtons[2]
    );
    consultApiSelectionValues.map((el) => {
      return el.map((h) => {
        const arrayFinal = h[1];
        return array3.push(arrayFinal);
      });
    });

    await addDoc(collection(db, "tables"), {
      fecha: "",
      filas: array1,
      columnas: array2,
      valores: array3,
      usuario: "",
    });
  };

  const generateReport = async () => {
    consultValues();
  };

  return (
    <div>
      <div className="bottomContainer">
        <section className="itemsSelected">
          <div className="containerVertical">
            <div className="containerR">
              Filas
              <ReactSortable
                list={row}
                setList={setRow}
                group={{ name: "selectedButton", pull: true }}
              >
                {!row
                  ? "Cargando..."
                  : row.map((item, index) => (
                      <button
                        className="btnSelect"
                        key={index}
                        ref={(button) => addToArrayOfSelectedButtons(button)}
                      >
                        {item}
                      </button>
                    ))}
              </ReactSortable>
            </div>
          </div>
          <article className="container_col_val">
            <div className="containerHorizontal">
              <div className="containerR">
                Columnas
                <ReactSortable
                  list={column}
                  setList={setColumn}
                  group={{ name: "selectedButton", pull: true }}
                >
                  {!column
                    ? "Cargando..."
                    : column.map((item, index) => (
                        <button
                          className="btnSelect"
                          key={index}
                          ref={(button) => addToArrayOfSelectedButtons(button)}
                        >
                          {item}
                        </button>
                      ))}
                </ReactSortable>
              </div>
            </div>
            <div className="containerHorizontal">
              <div className="containerR">
                Valores
                <ReactSortable
                  list={values}
                  setList={setValues}
                  group={{ name: "selectedButton", pull: true }}
                >
                  {!values
                    ? "Cargando..."
                    : values.map((item, index) => (
                        <button
                          className="btnSelect"
                          key={index}
                          ref={(button) => addToArrayOfSelectedButtons(button)}
                        >
                          {item}
                        </button>
                      ))}
                </ReactSortable>
              </div>
            </div>
          </article>
        </section>
        <section>
          <ButtonApp name="Generar Reporte" onClick={generateReport} />
        </section>
      </div>
    </div>
  );
};

export default Container;
