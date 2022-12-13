import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Icon } from "@iconify/react";
import { addCollectionResult } from "../Firebase/firebase.config";
import {
  consultValuesInTheApi,
  getValuesForCheckbox,
  filterData,
} from "../Functions/functions";
import { alertError } from "../Functions/sweetAlert";
import ButtonApp from "./ButtonApp";
import "../assets/styles/Container.css";
import { getData } from "../services/api_aralsoft";

const Container = () => {
  let ArrayOfSelectedButtons = [];

  const [row, setRow] = useState([]);
  const [column, setColumn] = useState([]);
  const [values, setValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [btnClick, setBtnClick] = useState("");
  const [dataRow, setDataRow] = useState([]);
  const [dataColumn, setDataColumn] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRow1, setFilterRow1] = useState([]);
  const [filterRow2, setFilterRow2] = useState([]);
  const [filterCol, setFilterCol] = useState([]);

  const [counterId, setCounterId] = useState(1);

  console.log(filterCol, "filterCol");

  const addToArrayOfSelectedButtons = (button) => {
    if (button != null) {
      ArrayOfSelectedButtons.push(button.textContent);
    }
  };

  /***************Filtro que consulta la api y trae todos los checkbox *********************/
  const getValuesFromRowButtons = async (index) => {
    const btn1 = ArrayOfSelectedButtons[0];
    const btn2 = ArrayOfSelectedButtons[1];
    const limitRow = row.length <= 2;
    setIsOpen(true);
    if (limitRow && index === 0) {
      const resultApiRow1 = await consultValuesInTheApi(btn1);
      getValuesForCheckbox(resultApiRow1, setDataRow);
      setBtnClick("fila1");
    } else if (limitRow && index === 1) {
      const resultApiRow2 = await consultValuesInTheApi(btn2);
      getValuesForCheckbox(resultApiRow2, setDataRow);
      setBtnClick("fila2");
    } else {
      alertError("Solo puedes seleccionar 2 opciones");
      setIsOpen(false);
    }
  };

  const getValuesFromColumnsButtons = async (index) => {
    const limitColumn = column.length === 1;
    setIsOpen(true);
    setBtnClick("column");
    let btnCol = "";
    if (limitColumn && row.length === 1 && index === 0) {
      btnCol = ArrayOfSelectedButtons[1];
      const resultApiColumn = await consultValuesInTheApi(btnCol);
      getValuesForCheckbox(resultApiColumn, setDataColumn);
    } else if (limitColumn && row.length === 2 && index === 0) {
      btnCol = ArrayOfSelectedButtons[2];
      const resultApiColumn = await consultValuesInTheApi(btnCol);
      getValuesForCheckbox(resultApiColumn, setDataColumn);
    } else {
      alertError("Solo puedes seleccionar 1 opción");
      setIsOpen(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  /************************Buscador*****************************************************/
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    filterData(dataRow, e.target.value, setDataRow);
    filterData(dataColumn, e.target.value, setDataColumn);
  };
  /***************************************************************************************/

  const reportID = () => {
    setCounterId(counterId + 1);
    return counterId;
  };

  const obtainFilteredElements = (e) => {
    if (btnClick === "fila1") {
      const value1 = e.target.value;
      const filterRowBtn1 = value1;
      setFilterRow1((filterRow1) => [...filterRow1, filterRowBtn1]);
      if (e.target.checked === false) {
        const removeItem1 = filterRow1.filter((item) => item !== value1);
        setFilterRow1(removeItem1);
      }
    } else if (btnClick === "fila2") {
      const value2 = e.target.value;
      const filterRowBtn2 = value2;
      setFilterRow2((filterRow2) => [...filterRow2, filterRowBtn2]);
      if (e.target.checked === false) {
        const removeItem2 = filterRow2.filter((item) => item !== value2);
        setFilterRow2(removeItem2);
      }
    }
    if (btnClick === "column") {
      const value3 = e.target.value;
      const filterColBtn = value3;
      setFilterCol((filterCol) => [...filterCol, filterColBtn]);
      if (e.target.checked === false) {
        const removeItem3 = filterCol.filter((item) => item !== value3);
        setFilterCol(removeItem3);
      }
    }
  };

  const generateReport = async () => {
    const nameRow1 = row[0].toString();
    const nameRow2 = row[1].toString();
    const nameColumn = column.toString();
    const nameValues = values.toString();
    const resId = reportID();
    await addCollectionResult(
      resId,
      nameRow1,
      nameRow2,
      nameColumn,
      nameValues,
      filterRow1,
      filterRow2
    );
    setFilterRow1([]);
    setFilterRow2([]);
  };

  return (
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
                      onClick={() => getValuesFromRowButtons(index)}
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
                        // onClick={() => openFilter(column)}
                        onClick={() => getValuesFromColumnsButtons(index)}
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
        <div className={isOpen ? "block" : "none"}>
          <form action="">
            <div className="headerFilter">
              <input
                className="inputSearch"
                type="search"
                value={search === null ? "" : search}
                placeholder="Buscar..."
                onChange={handleChangeSearch}
              />
              <Icon
                icon="mdi:close-circle-outline"
                className="closeFilter"
                onClick={closeModal}
              />
            </div>
            <label htmlFor="">Seleccionar Todo</label>
            <input
              name="selectAll"
              type="checkbox"
              className="check"
              //onChange={selectAllChecksByClicking}
            />
            <div className="options">
              {btnClick === "fila1" || btnClick === "fila2"
                ? dataRow.map((el, i) => {
                    return (
                      <div key={i}>
                        <input
                          name={el}
                          type="checkbox"
                          className="check"
                          value={el}
                          onChange={obtainFilteredElements}
                        />
                        <label htmlFor="">{el}</label>
                      </div>
                    );
                  })
                : dataColumn.map((el, i) => {
                    return (
                      <div key={i}>
                        <input
                          name={el}
                          type="checkbox"
                          className="check"
                          value={el}
                          onChange={obtainFilteredElements}
                        />
                        <label htmlFor="">{el}</label>
                      </div>
                    );
                  })}
            </div>
          </form>
        </div>
      </section>
      <section>
        <ButtonApp name="Generar Reporte" onClick={generateReport} />
      </section>
    </div>
  );
};
export default Container;
