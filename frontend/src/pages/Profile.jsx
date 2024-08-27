import { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";

export default function Profile() {
  const { auth } = useContext(AuthContext);
  const [updatePasswordOpen, setupdatePasswordOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}${
        auth.rol == "admin" ? "admin" : "usuario"
      }/actualizar-password`;
      const requestedOptions = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, requestedOptions);
      const data = await response.json();
      if (response.status === 200) {
        setSuccess(data.msg);
        setTimeout(() => setSuccess(""), 2000);
      } else {
        setError(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {error && (
        <div
          className="absolute right-8 flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Error! </span>
            {error}
          </div>
        </div>
      )}
      {success && (
        <div
          className="absolute right-8 flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Exito! </span>
            {success}
          </div>
        </div>
      )}
      <h1 className="text-3xl font-extrabold font-mono text-center mb-8">
        PERFIL
      </h1>
      <div className="flex flex-col justify-center items-center gap-8">
        <h3 className="text-5xl font-serif">
          {auth.nombre || auth.nombre_usuario} {auth.apellido || ""}
        </h3>
        <div className="flex flex-col">
          <span className="text-xl">
            <span className="font-bold">Correo: </span>
            {auth.email}
          </span>
          <span className="text-xl">
            <span className="font-bold">Rol: </span>
            {auth.rol}
          </span>
        </div>
        <button
          onClick={() => setupdatePasswordOpen(!updatePasswordOpen)}
          className="bg-blue-800 hover:bg-blue-500 text-slate-100 py-4 px-8 rounded-xl font-bold"
        >
          Actualizar Contraseña
        </button>
        <form
          onSubmit={handlePasswordUpdate}
          className={`flex flex-col bg-gray-200 p-4 w-96 rounded ${
            !updatePasswordOpen && "hidden"
          }`}
        >
          <label className="font-bold" htmlFor="actual_password">
            Contraseña Actual
          </label>
          <input
            className="p-2"
            type="password"
            placeholder="Ingresa tu contraseña actual"
          />
          <label className="font-bold" htmlFor="nueva_password">
            Nueva Contraseña
          </label>
          <input
            className="p-2"
            type="password"
            placeholder="Ingresa tu nueva contraseña"
          />
          <button
            type="submit"
            className="bg-blue-200 py-2 font-bold font-mono"
          >
            ACTUALIZAR
          </button>
        </form>
      </div>
    </>
  );
}
