import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PrivateRouteAdmin } from "../routes/PrivateRouteAdmin";
const UsersTable = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false)
  const [currentDelete, setCurrentDelete] = useState({id:'',type:''})

  const handleDelete = async (id, type) => {
    try {
      const token = localStorage.getItem('token')
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/${type}/${id}`,
        options
      );
      const data = await response.json();
      if (response.ok) {
        type === 'usuario' ? 
        setUsuarios(usuarios.filter((usuario) => usuario._id !== id))
        : setAdmins(admins.filter(admin => admin._id !== id));
        setOpenAlert(false)
        setSuccess(data.msg);
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } else {
        setOpenAlert(false)
        setError(data.msg);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const listarUsuarios = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/admin/usuarios`,{
          headers:{
            Authorization: `Bearer ${token}`
          }}
        );
        const data = await response.json();
        if (response.ok) {
          setUsuarios(data.usuarios);
          setAdmins(data.admins);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };
    listarUsuarios();
  }, []);

  useEffect(()=>{
    if (!openAlert){
        setCurrentDelete({id:'',type:''})
    }
  },[openAlert])
  return (
    <PrivateRouteAdmin>
    <Dialog open={openAlert} onClose={setOpenAlert} className="relative z-10">
        <DialogBackdrop
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center sm:items-start sm:p-0">
            <DialogPanel
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start px-2">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-bold mb-5 leading-6 text-gray-900">
                        {currentDelete.type === 'admin' ? 'Eliminar Administrador' : 'Eliminar Usuario'}
                    </DialogTitle>
                    <div className="mt-2">
                      <form className="w-full">
                        <div className="">
                            {currentDelete.type === 'admin' ? 
                            '¿Estás seguro de eliminar este administrador? Esta acción no se puede deshacer.':
                            '¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.'
                            }
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                type="button"
                onClick={()=>handleDelete(currentDelete.id, currentDelete.type)}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto disabled:hover:cursor-not-allowed"
                >
                Eliminar
                </button>
            
                <button
                type="button"
                data-autofocus
                onClick={() => setOpenAlert(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                >
                Cancelar
                </button>
            </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
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
      <Link
        to="/admin"
        className="inline-flex items-center border border-blue-900 px-3 py-1.5 mt-8 mx-8 rounded-md text-blue-900 hover:bg-blue-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          ></path>
        </svg>
        <span className="ml-1 font-bold text-lg">Regresar</span>
      </Link>
      <div>
        <div className="flex flex-col items-center overflow-x-auto md:max-h-[35vh] mb-8">
          <span className="font-bold text-sm mb-2">USUARIOS</span>
          <div className="inline-block w-[90vw] overflow-x-auto">
            <table className="min-w-full  text-sm font-light">
              <thead
                className={`border-b border-neutral-200 font-medium bg-slate-100 sticky top-0`}
              >
                <tr>
                  <th className="px-6 py-2 sticky top-0">Nombre</th>
                  <th className="px-6 py-2 sticky top-0">Apellido</th>
                  <th className="px-6 py-2 sticky top-0">Email</th>
                  <th className="px-6 py-2 sticky top-0">Email Confirmado</th>
                  <th className="px-6 py-2 sticky top-0">Opciones</th>
                </tr>
              </thead>
              <tbody className="divide-y text-center">
                {usuarios.length > 0 ? (
                  usuarios.map((usuario) => (
                    <tr
                      className="border-b border-neutral-20 hover:bg-gray-300"
                      key={usuario._id}
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        {usuario.nombre}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {usuario.apellido}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {usuario.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {usuario.confirmarEmail
                          ? "Confirmado"
                          : "No Confirmado"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4  ">
                        <span
                          onClick={() => {setOpenAlert(true); setCurrentDelete({id:usuario._id,type:'usuario'})}}
                          className="flex items-center justify-center text-red-700 font-bold hover:cursor-pointer transition-transform hover:scale-110 ease-in-out"
                        >
                          Eliminar
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14 42C12.9 42 11.9587 41.6087 11.176 40.826C10.3933 40.0433 10.0013 39.1013 10 38V12H8V8H18V6H30V8H40V12H38V38C38 39.1 37.6087 40.042 36.826 40.826C36.0433 41.61 35.1013 42.0013 34 42H14ZM34 12H14V38H34V12ZM18 34H22V16H18V34ZM26 34H30V16H26V34Z"
                              fill="#D22F27"
                            />
                          </svg>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="text-xl text-slate-500 font-bold p-4"
                      colSpan={5}
                    >
                      {loading ? "Cargando usuarios..." : "No existen usuarios registrados"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col items-center overflow-x-auto md:max-h-[35vh]">
          <span className="font-bold text-sm mb-2">ADMINISTRADORES</span>
          <div className="inline-block w-[90vw] overflow-x-auto">
            <table className="min-w-full  text-sm font-light">
              <thead
                className={`border-b border-neutral-200 font-medium bg-slate-100 sticky top-0`}
                >
                <tr>
                  <th className="px-6 py-2 sticky top-0">Nombre</th>
                  <th className="px-6 py-2 sticky top-0">Email</th>
                  <th className="px-6 py-2 sticky top-0">Email Confirmado</th>
                  <th className="px-6 py-2 sticky top-0">Opciones</th>
                </tr>
              </thead>
              <tbody className="divide-y text-center">
                {admins.length > 0 ? (
                  admins.map((admin) => (
                    <tr
                    className="border-b border-neutral-20 hover:bg-gray-300"
                    key={admin._id}
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        {admin.nombre_usuario}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {admin.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {admin.confirmarEmail ? "Confirmado" : "No Confirmado"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4  ">
                        <span
                        onClick={() => {setOpenAlert(true); setCurrentDelete({id:admin._id,type:'admin'})}} 
                        className="flex items-center justify-center text-red-700 font-bold hover:cursor-pointer transition-transform hover:scale-110 ease-in-out">
                          Eliminar
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                              d="M14 42C12.9 42 11.9587 41.6087 11.176 40.826C10.3933 40.0433 10.0013 39.1013 10 38V12H8V8H18V6H30V8H40V12H38V38C38 39.1 37.6087 40.042 36.826 40.826C36.0433 41.61 35.1013 42.0013 34 42H14ZM34 12H14V38H34V12ZM18 34H22V16H18V34ZM26 34H30V16H26V34Z"
                              fill="#D22F27"
                              />
                          </svg>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="text-xl text-slate-500 font-bold p-4"
                      colSpan={4}
                      >
                      {loading ? "Cargando administradores..." : "No existen administradores registrados"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PrivateRouteAdmin>
  );
};
export default UsersTable;
