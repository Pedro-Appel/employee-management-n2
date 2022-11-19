import './styles/style.css';
import NavigationButton from './components/NavigationButton';
import { useNavigate } from "react-router-dom";
import useFetch from 'use-http'


const baseURL = `https://mack-webmobile.vercel.app/api/users`;

export function CreateUser(){

  const navigate = useNavigate()
  const opt = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }
  const { post, response  } = useFetch(baseURL)

  const newUser = async (event) => {
    const formData = new FormData(event.target);
    const json = Object.fromEntries(formData.entries());
    event.preventDefault();
    await post("", {
      avatar: json.avatar,
      date: json.date,
      email: json.email,
      name: json.name,
      salary: json.salary,
      status: json.status,
    });
    if (response.ok) {
      setTimeout(function() {
        // navigate('/')
      }, 1000)
    };
  }

  return (
    <div className="page_create_user">
      <h1 className="page_title">Criar um Funcionario</h1>
        <NavigationButton routeToNavigate='/' name='Buscar Funcionarios'/>
      <form onSubmit={newUser}>
        
        <div><label>Name:<input type="text" name="name" /></label></div>
        <div><label>Email: <input type="text" name="email" /></label></div>
        <div><label>Salario: <input type="text" name="salary" /></label></div>
        <div><label>Data: <input type="text" name="date" /></label></div>
        <div><label>Status: <select type="text" name="status">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label></div>
        <div><label>Link para foto: <input type="text" name="avatar" /></label></div>
          <input type="submit" value="Submit" />
        
      </form>
    </div>
  )
}