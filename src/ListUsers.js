import "./styles/style.css";
import "./styles/employeeTable.css";
import { useCallback, useState, useEffect} from "react";
import NavigationButton from "./components/NavigationButton";
import useFetch from 'use-http'

const baseURL = `https://mack-webmobile.vercel.app/api/users`;

export function ListUser() {

  const [employees, setEmployees] = useState([]);
  const options = {};
  const { 
    get, 
    response, 
    loading, 
    error, 
    data = [] 
  } = useFetch(`https://mack-webmobile.vercel.app/api/users`, options, [])

  function retrieveEmployees(){
    console.log("retrieving ...")
    fetch(baseURL).then((res)=> res.json())
    .then((res) => setEmployees(res))
  }
  function removeEmployees(id){
    fetch(baseURL+`/${id}`, {method: 'DELETE'})
    .then((res)=> res.json()).then(removeEmployees())
  }

  useEffect(()=>{
    retrieveEmployees()
  },[])

  // useEffect(() => {
  //   // console.log("First Fetch", data)
  //   if(loading){
  //     console.log("loading...")
  //   }
  //   if(error){
  //     console.log("error...")
  //   }
  //   if(data !== [] && employees === []){
  //     setEmployees(data)
      
  //   }
  //   else{
  //     loadEmployees()

  //   }
  // }, [error, loading, data, employees]) 


  // async function loadEmployees(){
  //   const newEmployees = await get()
  //   console.log("Dentro da busca ",newEmployees)
    
  //   setTimeout(function() {
  //     setEmployees(newEmployees)
  //   }, 500)
  // }
  // async function removeEmployee(e) {
  //   fetch(baseURL+`/${e}`, {method: 'DELETE'})
    
  //   setTimeout(function() {
  //     setEmployees([])
  //   }, 500)
  //   }

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
          <button className="navigate-button" onClick={() => retrieveEmployees()}>
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
                      onClick={() => removeEmployees(e._id)}
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
  </div>);
}