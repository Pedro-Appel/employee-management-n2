import "./styles/style.css";
import "./styles/buttons.css";
import "./styles/employeeDetails.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "use-http";
import NavigationButton from "./components/NavigationButton";

const baseURL = `https://mack-webmobile.vercel.app/api/users/`;

export function GetUser() {

  const { id } = useParams();  
  const navigate = useNavigate();
  
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const {put, get, loading, error, response } = useFetch(baseURL+id);

  const send = async (json) => {
    if(json.avatar === '' ) json.avatar = selectedEmployee.avatar
    if(json.date === '' ) json.date = selectedEmployee.date
    if(json.email === '' ) json.email = selectedEmployee.email
    if(json.name === '' ) json.name = selectedEmployee.name
    if(json.salary === '' ) json.salary = selectedEmployee.salary
    if(json.status === 'Escolher' ) json.status = selectedEmployee.status

    var payload = {
      avatar: json.avatar,
      date: json.date,
      email: json.email,
      name: json.name,
      salary: json.salary,
      status: json.status,
    }
    await put("", payload);
    setTimeout(function() {
      navigate('/')
    }, 1000)

  }

  function  updateEmployee(event) {
    const formData = new FormData(event.target);
    const json = Object.fromEntries(formData.entries());
    event.preventDefault();
    if( json.avatar !== '' 
        || json.date !== '' 
        || json.email !== '' 
        || json.name !== '' 
        || json.salary !== '' 
        || json.status !== 'Escolher')
        {
          send(json)
        }

    else {
      return
    }
    
  }

  useEffect(() => { 
    async function loadUser() {
      const user = await get()
      if(response.ok) setSelectedEmployee(user)
    }
  
  loadUser() }, [get, id, response.ok]);

  return (
    <>
      <div className="page_get_user">
        <div className="card-container">
          <div className="card">
            {loading && <h1>loading...</h1>}
            {error && <h1>failed when loading...</h1>}
            {(!loading && !error && selectedEmployee) && 
              <form onSubmit={updateEmployee}>
                <h3>Foto</h3>
                <img className='card-image' src={selectedEmployee.avatar} alt='user'></img>

                <h3>Name</h3>
                <label>
                  <input name="name" placeholder={selectedEmployee.name}></input>
                </label>

                <h3>Email</h3>
                <label>
                  <input name="email" placeholder={selectedEmployee.email}></input>
                </label>

                <h3>Salary</h3>
                <label>
                <input name="salary" placeholder={selectedEmployee.salary}></input>
                </label>

                <h3>Date</h3>
                <label>
                <input name="date" placeholder={selectedEmployee.date}></input>
                </label>
                
                <h3>Status</h3>
                <select type="text" name="status">
                <option value="Escolher">Escolher</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                </select>
                <div className="options-container">
                  <NavigationButton class="back-button" routeToNavigate="/" name="Voltar"/>
                  <input  className="option-button" type='submit'></input>
                </div>
              </form>
            }
          </div>
        </div>
      </div>
    </>
  );
}
