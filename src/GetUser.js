import './styles/style.css';
import { useState, useEffect} from "react";
import { useParams } from 'react-router-dom'
import NavigationButton from './components/NavigationButton';

const baseURL = `https://mack-webmobile.vercel.app/api/users/`;

export function GetUser(){
  const {id} = useParams()
  const [selectedEmployee, setSelectedEmployee] = useState([]);

  function buscarUsuario(){
    console.log(id)
    fetch(baseURL+id)
      .then((response) => response.json())
      .then((data) => setSelectedEmployee(data));
    };
  
  useEffect(()=>{
    buscarUsuario()
  }, [])

  return (
    <div className="page_get_user">
      <NavigationButton routeToNavigate='/' name='Buscar Funcionarios'/>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={selectedEmployee.avatar}></img>
            </td>
            <td>{selectedEmployee.name}</td>
            <td>{selectedEmployee.email}</td>
            <td>{selectedEmployee.salary}</td>
            <td>{selectedEmployee.date}</td>
            <td>{selectedEmployee.status}</td>
          </tr>
        </tbody>
      </table>
      </div>
      );
}