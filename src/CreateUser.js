import "./styles/style.css";
import "./styles/buttons.css";
import "./styles/employeeForm.css";
import NavigationButton from "./components/NavigationButton";
import { useNavigate } from "react-router-dom";
import { useFetch } from "use-http";


const baseURL = `https://mack-webmobile.vercel.app/api/users`;

export function CreateUser() {

  const navigate = useNavigate();
  
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
        navigate('/')
      }, 1000)
    };
  }


  return (
    <div className="page">
      <h1 className="page-title">Criar um Funcionario</h1>
      <div className="form-container">
        <form className="form" onSubmit={newUser}>
          <div className="label-container">

            <div className='input-title'>Nome</div>
            <input className="w3-input w3-animate-input" type="text" name="name"/>

            <div className='input-title'>Email</div>
            <input className="w3-input w3-animate-input" type="text" name="email" />

            <div className='input-title'>Salário</div>
            <input className="w3-input w3-animate-input" type="text" name="salary" />

            <div className='input-title' >Data</div>
            <input className="w3-input w3-animate-input" type="text" name="date" />

            <div className='input-title'>Link da Foto</div>
            <input className="w3-input w3-animate-input" type="text" name="avatar" />

            
            <div className='input-title'>Status</div>
            <select className="w3-select" type="text" name="status">
              <option value="" disabled selected>Escolha um status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

          </div>
          <div className="page-button-wrap">
            
              <input className="option-button" type="submit"value="Adicionar"/>
              
              <NavigationButton class="back-button" routeToNavigate="/" name="Voltar"/>

          </div>
        </form>
      </div>
    </div>
  );
}

