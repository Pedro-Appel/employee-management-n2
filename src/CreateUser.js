import "./styles/style.css";
import "./styles/buttons.css";
import "./styles/employeeForm.css";
import NavigationButton from "./components/NavigationButton";
import { useNavigate } from "react-router-dom";

const baseURL = `https://mack-webmobile.vercel.app/api/users`;

export function CreateUser() {
  const navigate = useNavigate();
  function createEmployee(event) {
    const formData = new FormData(event.target);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    fetch(baseURL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: json,
    }).then(
      setTimeout(function () {
        navigate("/");
      }, 1000)
    );

    event.preventDefault();
  }

  return (
    <div className="page">
      <h1 className="page-title">Criar um Funcionario</h1>
      <div className="form-container">
        <form className="form" onSubmit={createEmployee}>
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
