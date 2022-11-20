import "./styles/style.css";
import "./styles/employeeTable.css";
import { useState, useEffect} from "react";
import NavigationButton from "./components/NavigationButton";
import useFetch from 'use-http'

const baseURL = `https://mack-webmobile.vercel.app/api/users`;

export function ListUser() {
  const [employees, setEmployees] = useState([]);

  const options = {cache: 'no-cache'};
  const { 
    loading, 
    error, 
  } = useFetch(`https://mack-webmobile.vercel.app/api/users`, options)

  async function retrieveEmployees(){
    fetch(baseURL, options)
    .then((res)=> res.json())
    .then((res)=> setEmployees(res))
  }

  function removeEmployees(id){
    fetch(baseURL+`/${id}`, {method: 'DELETE'})
    .then(setTimeout(function() {
      retrieveEmployees()
    }, 500))
  }

  useEffect(() => {  
  
  async function loadInitial() {
    retrieveEmployees()
  }
  
  // async function loadInitial() {
  //   await get('')
  //   var e = await response.json()
  //   if (response.ok) setEmployees(e)
  // }

  loadInitial() }, []) // componentDidMount

  return (
    <>
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
            <button className="navigate-button" onClick={retrieveEmployees}>
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
            {loading && <div> <h1> Loading....</h1> </div>}
            {error && <p>ERROR... </p>}
            {employees && 
            employees.map((e) => {
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
                        name="Editar"
                        />
                    </td>
                    <td>
                      <button className="delete-button" onClick={()=>removeEmployees(e._id)}>
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
  </>
  );
}