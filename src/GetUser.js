import "./styles/style.css";
import "./styles/buttons.css";
import "./styles/employeeDetails.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "use-http";
import NavigationButton from "./components/NavigationButton";
import { useNavigate } from "react-router-dom";

const baseURL = `https://mack-webmobile.vercel.app/api/users/`;

export function GetUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const { loading, error, data = [] } = useFetch(baseURL + id, []);

  useEffect(() => {
    if (loading) {
      console.log("loading...");
    } else if (error) {
      navigate("/");
    } else {
      console.log(data);
      setSelectedEmployee(data);
    }
  }, [loading, error, navigate, data]);

  return (
    <div className="page_get_user">
      <div className="card-container">
        <div className="card">
          <h3>Avatar</h3>
          <img src={selectedEmployee.avatar}></img>
          <h3>Name</h3>
          <p>{selectedEmployee.name}</p>
          <h3>Email</h3>
          <p>{selectedEmployee.email}</p>
          <h3>Salary</h3>
          <p>{selectedEmployee.salary}</p>
          <h3>Date</h3>
          <p>{selectedEmployee.date}</p>
          <h3>Status</h3>
          <p>{selectedEmployee.status}</p>
          <NavigationButton
            class="back-button"
            routeToNavigate="/"
            name="Voltar"
          />
        </div>
      </div>
    </div>
  );
}
