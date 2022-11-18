import './styles/style.css';
import { useState, useEffect } from "react";
import NavigationButton from './components/NavigationButton';

const baseURL = `https://mack-webmobile.vercel.app/api/users`;

export function ListUser(){
  const [employees, setEmployees] = useState([]);
  
  function buscarUsuarios(){
  fetch(baseURL)
    .then((response) => response.json())
    .then((data) => setEmployees(data));
  };

  function deleteUser(id){
    fetch(baseURL+`/${id}`, { method: 'DELETE' })
    .then((res) => console.log(res))
    .then(() => buscarUsuarios());
  }
    
  useEffect(() => {
    buscarUsuarios()
    }, []);

  return (
    <div className="page">
      <h1 className="page-title">LISTA DE FUNCIONARIOS</h1>
      <div className="page-buttons">
        <NavigationButton routeToNavigate='/create' name="Criar Funcionarios"/>
        <button onClick= {() => buscarUsuarios()}>Buscar Funcionarios</button>
      </div>
      
      {employees.map((e) => {
          return (
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
            <tbody>
              <tr>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.salary}</td>
                <td>{e.date}</td>
                <td>{e.status}</td>
                <td>
                <NavigationButton routeToNavigate={`/get/${e._id}`} name="Ver Detalhes"/>
                </td>
                <td><button onClick={()=>deleteUser(e._id)}></button></td>
              </tr>
            </tbody>
           
          </table>
          );
        })}
        
    </div>
  )
}