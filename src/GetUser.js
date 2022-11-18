import './styles/style.css';
import { useState, useEffect} from "react";
import { useParams } from 'react-router-dom'
import useFetch from 'use-http'
import NavigationButton from './components/NavigationButton';
import { useNavigate } from "react-router-dom";

const baseURL = `https://mack-webmobile.vercel.app/api/users/`;

export function GetUser(){
  const navigate = useNavigate()
  const {id} = useParams()
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const {loading, error, data = []} = useFetch(baseURL+id, [])

  useEffect(()=>{
    if(loading){
      console.log("loading...")
    } 
    else if (error){
      navigate('/')
    }
    else{
      console.log(data)
      setSelectedEmployee(data)
    }
    
  }, [loading, error, navigate, data])

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