import { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";

export default function Profile() {
  const { auth } = useContext(AuthContext);
  const [updatePasswordOpen, setUpdatePasswordOpen] = useState(false);
  const [form, setForm] = useState({
    actual_password: "",
    nueva_password: "",
    confirmar_nueva_password: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (form.nueva_password !== form.confirmar_nueva_password) {
      setError("Las nuevas contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const requestedOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}${
          auth.rol === "admin" ? "admin" : "usuario"
        }/actualizar-password`,
        requestedOptions
      );
      const data = await response.json();

      if (response.status === 200) {
        setSuccess(data.msg);
        setTimeout(() => setSuccess(""), 2000);
        setForm({
          actual_password: "",
          nueva_password: "",
          confirmar_nueva_password: "",
        });
      } else {
        setError(data.msg || "Ocurrió un error inesperado");
      }
    } catch (error) {
      setError(
        "Error al actualizar la contraseña, por favor inténtalo de nuevo."
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
            <span className="font-medium">Éxito! </span>
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
          onClick={() => setUpdatePasswordOpen(!updatePasswordOpen)}
          className="bg-blue-800 hover:bg-blue-500 text-slate-100 py-4 px-8 rounded-xl font-bold"
        >
          {updatePasswordOpen ? "Ocultar" : "Actualizar Contraseña"}
        </button>
        <form
          onSubmit={handlePasswordUpdate}
          className={`flex flex-col bg-indigo-300 p-4 lg:w-96 w-80 rounded ${
            !updatePasswordOpen && "hidden"
          }`}
        >
          <label className="font-bold" htmlFor="actual_password">
            Contraseña Actual
          </label>
          <input
            className="p-2"
            type="password"
            name="actual_password"
            onChange={handleValue}
            value={form.actual_password}
            placeholder="Ingresa tu contraseña actual"
          />
          <label className="font-bold" htmlFor="nueva_password">
            Nueva Contraseña
          </label>
          <input
            className="p-2"
            type="password"
            name="nueva_password"
            onChange={handleValue}
            value={form.nueva_password}
            placeholder="Ingresa tu nueva contraseña"
          />
          <label className="font-bold" htmlFor="confirmar_nueva_password">
            Confirmar Nueva Contraseña
          </label>
          <input
            className="p-2"
            type="password"
            name="confirmar_nueva_password"
            onChange={handleValue}
            value={form.confirmar_nueva_password}
            placeholder="Confirma tu nueva contraseña"
          />
          <button
            type="submit"
            className={`bg-blue-200 py-2 font-bold font-mono rounded-b ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
            disabled={loading}
          >
            {loading ? "ACTUALIZANDO..." : "ACTUALIZAR"}
          </button>
        </form>
      </div>
    </>
  );
}
