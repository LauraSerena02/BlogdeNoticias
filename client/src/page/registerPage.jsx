import loginImage from '../images/monoculo.png';
import "../styles.css/register.css";
import { useForm } from "react-hook-form";
import {useAuth} from "../context/authContext"
//2 27 36


<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"></link>

function RegisterPage() {

  const { register,handleSubmit } = useForm();
  const {signup} = useAuth()
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
        <form  onSubmit={handleSubmit(async(values)=>{console.log(values)
          signup(values)
        //lo envie a authContext.jsx
          //const res = await RegisterRequest(values) este es el envio ala api
          //console.log(res)
        })}>
          <input type="text" name="Nombre" placeholder="Nombre"{...register("Nombre", { required: true })}/>
          <input type="text" name="Apellido" placeholder="Apellido" {...register("Apellido", { required: true })}/>
          <input type="email" name="Email" placeholder="Correo Electronico" {...register("Email", { required: true })}/>
          <input type="password" name="Contraseña" placeholder="Contraseña"{...register("Contraseña", { required: true })} />
          <button type="submit">Ingresar</button>
          <button type="button">Ir a Inicio</button>
        </form>
      </div>
    </div> 
  );
}

export default RegisterPage;
