import './styles/style.css';
import NavigationButton from './components/NavigationButton';
import { useEffect } from 'react';

const baseURL = `https://mack-webmobile.vercel.app/api/users`;

export function CreateUser(){
  function createEmployee(event){
    const formData = new FormData(event.target);

    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    console.log(json)
    fetch(baseURL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: json 
    })
    .then((res)=>console.log(JSON.stringify(res)))

    event.preventDefault(); // 👈️ prevent page refresh
  }
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  return (
    <div className="page_create_user">
      <h1 className="page_title">Criar um Funcionario</h1>
        <NavigationButton routeToNavigate='/' name='Buscar Funcionarios'/>
      <form onSubmit={createEmployee}>
        
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