import loginImage from '../images/monoculo.png';
import "../styles.css/register.css";
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"></link>

function RegisterPage() {
  return (
    <div>
      <div className="header">
        <img src={loginImage} className='logo' alt="Logo" />
        <div className="Titulo">
          <h1>EL OBSERVADOR</h1>
          <h2>Registrarse</h2>
        </div>
      </div>

      <div className="container">
        <form>
          <input type="text" name="Nombre" placeholder="Nombre" />
          <input type="text" name="Apellido" placeholder="Apellido" />
          <input type="text" name="Email" placeholder="Correo Electronico" />
          <input type="text" name="Contraseña" placeholder="Contraseña" />
          <button type="submit">Ingresar</button>
          <button type="button">Ir a Inicio</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
