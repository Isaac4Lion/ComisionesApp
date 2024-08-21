import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import CondicionesForm from "./CondicionesForm";
export default function () {
  const [condiciones, setCondiciones] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [actualId, setActualId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const listarCondiciones = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/condiciones");
      const data = await response.json();
      if (response.ok) {
        setCondiciones(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listarCondiciones();
  }, []);

  const eliminarCondicion = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/condicion/${id}`,{method:'DELETE'})
        const data = await response.json()
        if (response.ok){
            setSuccess(data.msg)
            setTimeout(()=> {
                setSuccess('')
            },3000)
            setCondiciones(condiciones.filter((condicion)=>{
                if (condicion._id !== id){ return condicion}
            }))
        }else{
            setError(data.msg)
            setTimeout(()=>{
                setError('')
            },3000)
        }
    } catch (error) {
        console.log(error.message)
        setError(error.message)
        setTimeout(()=>{
            setError('')
        },3000)
    }
  }

  useEffect(()=>{
    if(!openAlert){
        setActualId(null)
    }
  },[openAlert])

  useEffect(()=>{
    listarCondiciones()
  },[success])

  return (
    <>
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
                    {'Eliminar Condición'}
                </DialogTitle>
                <div className="mt-2">
                  <form className="w-full">
                    <div className="">
                        ¿Estás seguro de eliminar esta condición? Esta acción no se puede deshacer.
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto disabled:hover:cursor-not-allowed"
            onClick={()=>{eliminarCondicion(actualId); setOpenAlert(false)}}
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
  {<CondicionesForm open={open} setOpen={setOpen} setSuccess={setSuccess} actualId={actualId} setActualId={setActualId}/>}
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
  <a
    href="/admin/"
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
  </a>
      <div className="flex flex-col items-center overflow-x-auto mb-8">
        <span className="font-bold text-xl sm:text-3xl my-2">CONDICIONES</span>
        <div className="inline-block w-[90vw] overflow-x-auto min-h-[50vh]">
          <table className="min-w-full  text-sm font-light">
            <thead
              className={`border-b border-neutral-200 font-medium bg-slate-100 sticky top-0`}
            >
              <tr>
                <th className="px-6 py-2 sticky top-0">Nombre</th>
                <th className="px-6 py-2 sticky top-0">Porcentaje Comisión</th>
                <th className="px-6 py-2 sticky top-0">Nro Pagos</th>
                <th className="px-6 py-2 sticky top-0">Tipo de Condicion</th>
                <th className="px-6 py-2 sticky top-0">Condicion</th>
                <th className="px-6 py-2 sticky top-0">Opciones</th>
              </tr>
            </thead>
            <tbody className="divide-y text-center">
              {condiciones.length > 0 ? (
                condiciones.map((condicion) => (
                  <tr
                    className="border-b border-neutral-20 hover:bg-gray-300"
                    key={condicion._id}
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      {condicion.nombre}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {`${condicion.porcentaje_comision}%`}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {condicion.nro_pagos}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {condicion.condicion_porcentaje
                        ? "Porcentaje"
                        : condicion.condicion_dias
                        ? "Días"
                        : "????"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {condicion.condicion_porcentaje
                        ? `${condicion.condicion_porcentaje}%`
                        : condicion.condicion_dias
                        ? `${condicion.condicion_dias} días`
                        : "????"}
                    </td>
                    <td className="flex justify-center items-center whitespace-nowrap px-6 py-4  ">
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="hover:cursor-pointer hover:scale-110 transition-transform ease-in"
                        onClick={()=>{setOpen(true); setActualId(condicion._id)}}
                        >
                        <path
                          d="M19.8637 3.81C20.7025 2.97108 21.8401 2.49972 23.0264 2.4996C24.2127 2.49949 25.3504 2.97062 26.1893 3.80937C27.0282 4.64812 27.4996 5.78577 27.4997 6.97205C27.4998 8.15834 27.0287 9.29608 26.19 10.135L25.075 11.2512L18.75 4.925L19.8637 3.81ZM17.425 6.25125L4.92496 18.75C4.41688 19.2576 4.05985 19.8963 3.89371 20.595L2.52496 26.3475C2.4879 26.5033 2.49137 26.666 2.53505 26.8201C2.57873 26.9742 2.66115 27.1145 2.77447 27.2277C2.88778 27.3409 3.0282 27.4232 3.18234 27.4667C3.33647 27.5102 3.49918 27.5135 3.65496 27.4763L9.40621 26.1062C10.1053 25.9403 10.7446 25.5833 11.2525 25.075L23.75 12.5762L17.425 6.25125Z"
                          fill="black"
                          />
                      </svg>

                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="hover:cursor-pointer hover:scale-110 transition-transform ease-in"
                        onClick={()=>{setOpenAlert(true); setActualId(condicion._id)}}
                      >
                        <path
                          d="M14 42C12.9 42 11.9587 41.6087 11.176 40.826C10.3933 40.0433 10.0013 39.1013 10 38V12H8V8H18V6H30V8H40V12H38V38C38 39.1 37.6087 40.042 36.826 40.826C36.0433 41.61 35.1013 42.0013 34 42H14ZM34 12H14V38H34V12ZM18 34H22V16H18V34ZM26 34H30V16H26V34Z"
                          fill="#D22F27"
                        />
                      </svg>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="text-xl text-slate-500 font-bold p-4"
                    colSpan={5}
                  >
                    No existen condiciones registradas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <button
        onClick={()=>setOpen(true)} 
        className="px-6 py-4 bg-green-600 hover:bg-green-500 text-white font-extrabold rounded">
            CREAR NUEVA CONDICIÓN
        </button>
      </div>
    </>
  );
}
