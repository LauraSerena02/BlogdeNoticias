import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import loginImage from "../images/monoculo.png"; // Importa la imagen de inicio de sesión
import "../styles.css/registrarse.css";

function Registrarse() {
  // Efecto para gestionar la clase del body para estilos
  useEffect(() => {
    document.body.classList.add("special-body"); // Agrega clase especial al montarse

    // Función de limpieza para eliminar la clase al desmontarse
    return () => {
      document.body.classList.remove("special-body");
    };
  }, []);

  // Configuración del hook useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Manejador para la sumisión del formulario
  const onSubmit = (data) => {
    console.log(data);
    // Lógica para manejar la sumisión del formulario aquí
  };

  // Función para manejar la entrada de caracteres en ciertos campos
  const handleBeforeInput = (event) => {
    const char = event.data;
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]$/.test(char)) {
      event.preventDefault();
    }
  };

  return (
    <>
      {/* Sección de Encabezado */}
      <div className="header-register">
        <img className="logo" src={loginImage} alt="Descripción de la imagen" />
        <h1 id="title_register">EL OBSERVADOR</h1>
      </div>

      {/* Formulario Principal de Registro */}
      <div className="body_register">
        <h2>Registrarse</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campos de Nombre y Apellido */}
          <div className="input-container">
          <span className="asterisk">*</span>
            <input
              className="input-register"
              type="text"
              placeholder="Nombre"
              {...register("name", {
                required: true,
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                },
              })}
              onBeforeInput={handleBeforeInput}
            />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
            


            <span class="asterisk">*</span>
            <input
              className="input-register"
              type="text"
              placeholder="Apellido"
              {...register("lastname", {
                required: true,
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                },
              })}
              onBeforeInput={handleBeforeInput}
            />
            {errors.lastname && (
              <span className="error-message">{errors.lastname.message}</span>
            )}
            
            {/* Campo de Correo Electrónico */}
            <span className="asterisk">*</span>
            <input
              className="input-register"
              type="email"
              placeholder="Correo electrónico"
              {...register("gmail", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Formato de correo electrónico inválido",
                },
              })}
            />
            {errors.gmail && (
              <span className="error-message">{errors.gmail.message}</span>
            )}
            

            {/* Campo de Contraseña */}
            <span className="asterisk">*</span>
            <input
              className="input-register"
              type="password"
              placeholder="Contraseña"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                  
                },
              })}
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
           
            <p className="text">
              "La contraseña debe incluir al menos un número, una letra
              mayúscula, una letra minúscula y un carácter especial"
            </p>
          </div>

          {/* Contenedor del Botón de Registro */}
          <div className="button-container">
            <button type="submit" className="button-register">
              Registrar
            </button>
            <button type="submit" className="button-register">
              Ir al inicio
            </button>
          </div>
          <p className="text1">* Los campos son obligatorios</p>
        </form>
      </div>
    </>
  );
}

export default Registrarse;
