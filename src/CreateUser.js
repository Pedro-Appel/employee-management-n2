import "./styles/style.css";
import "./styles/buttons.css";
import "./styles/employeeForm.css";
import NavigationButton from "./components/NavigationButton";
import { useNavigate } from "react-router-dom";
import { useFetch } from "use-http";


const baseURL = `https://mack-webmobile.vercel.app/api/users`;

export function CreateUser() {

  const navigate = useNavigate();

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
            <label>
              <div className="label-title">Name</div>
              <input type="text" name="name" />
            </label>

            <label>
              <div className="label-title">Email</div>
              <input type="text" name="email" />
            </label>

            <label>
              <div className="label-title">Salário</div>
              <input type="text" name="salary" />
            </label>

            <label>
              <div className="label-title">Data</div>
              <input type="text" name="date" />
            </label>

            <label>
              <div className="label-title">Link da Foto</div>
              <input type="text" name="avatar" />
            </label>

            <label className="status-label">
              <div className="label-title">Status</div>
              <select type="text" name="status">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
          </div>
          <div className="options-container">
            <div className="option">
              <input
                className="option-button"
                type="submit"
                value="Adicionar"
              />
            </div>
            <div className="option">
              <NavigationButton
                class="back-button"
                routeToNavigate="/"
                name="Voltar"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

