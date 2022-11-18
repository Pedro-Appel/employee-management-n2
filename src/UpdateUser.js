import './styles/style.css';

export function UpdateUser(){
  return (
    <div className="section">
      <h1 className="sectiontitle">LISTA DE EMPREGADOS</h1>
      <button className="sectionbutton">Adicionar Empregado</button>
      <table className="section__table">
        <th>
          <td>Nome</td>
          <td>Email</td>
          <td>Salário</td>
          <td>Aniversário</td>
          <td>Status</td>
          <td>Ações</td>
        </th>
      </table>
    </div>
  )
}