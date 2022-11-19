import "./styles/style.css";
import "./styles/employeeTable.css";
import "./styles/buttons.css";
import { useState, useEffect } from "react";
import NavigationButton from "./components/NavigationButton";
import useFetch from "use-http";
import { resolvePath } from "react-router-dom";

const baseURL = `https://mack-webmobile.vercel.app/api/users`;

export function ListUser() {
  const [employees, setEmployees] = useState([]);

  function buscarUsuarios() {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => setEmployees(data));
  }

  function deleteUser(id) {
    fetch(baseURL + `/${id}`, { method: "DELETE" })
      .then((res) => console.log(res))
      .then(() => buscarUsuarios());
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">LISTA DE FUNCIONARIOS</h1>

      <h2 className="options-title">Opções:</h2>
      <div className="page-buttons">
        <div className="page-button-container">
          <NavigationButton
            class="option-button"
            routeToNavigate="/create"
            name="Adicionar Funcionário"
          />
        </div>
        <div className="page-button-container">
          <button className="navigate-button" onClick={() => buscarUsuarios()}>
            Atualizar Funcionários
          </button>
        </div>
      </div>

      <div className="page-tables">
        <table className="page__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Date</th>
              <th>Status</th>
              <th>See Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          {employees.map((e) => {
            return (
              <tbody>
                <tr>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.salary}</td>
                  <td>{e.date}</td>
                  <td>{e.status}</td>
                  <td>
                    <NavigationButton
                      class="navigate-button"
                      routeToNavigate={`/get/${e._id}`}
                      name="Ver Detalhes"
                    />
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => deleteUser(e._id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
