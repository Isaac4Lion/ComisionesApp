"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function InfoLot({
  open,
  setOpen,
  setOpenAlert,
  openCommission,
  setOpenCommission,
  detalleLote,
  setDetalleLote,
  listarLotes,
  type,
}) {
  let valorTotalRecibidoAnterior = detalleLote.valor_total_recibido ;
  const [valorTotalRecibido, setValorTotalRecibido] = useState(
    valorTotalRecibidoAnterior
  );
  const [edit, setEdit] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setValorTotalRecibido(valorTotalRecibidoAnterior);
  }, [open, valorTotalRecibidoAnterior]);  

  const handleValorTotalRecibido = (e) => {
    setValorTotalRecibido(e.target.value);
  };

  const handleEditButton = async (e) => {
    e.preventDefault();
    if (edit) {
      if (valorTotalRecibidoAnterior != valorTotalRecibido) {
        try {
          const token = localStorage.getItem('token')
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}lotes/${detalleLote.id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
               },
              body: JSON.stringify({
                valor_total_recibido: Number(valorTotalRecibido),
              }),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            console.error('Error del servidor:', errorData);
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }else{
            const data = await response.json();
            setSuccessMessage(data.msg);
            setDetalleLote(data.loteModificado);
            listarLotes(detalleLote.id);
            setTimeout(() => {
              setSuccessMessage("");
              setOpen(false);
            }, 2000);
          }
        } catch (error) {
          console.log(error)
          setErrorMessage(error.message);
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
        }
      }
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  const resolverLoteDesistido = async () =>{
    try {
      const token = localStorage.getItem("token");
      const requestedOptions = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}lotes-desistidos/${detalleLote.id}`,
        requestedOptions
      );
      const data = await response.json();
      if (response.status === 200) {
        listarLotes();
        setOpen(false);
        setSuccessMessage(data.msg);
        setTimeout(() => setSuccessMessage(""), 2000);
      } else {
        console.log(data)
        setErrorMessage(data.msg)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!open) {
      setEdit(false);
    }
  }, [open]);
  useEffect(() => {
    if (openCommission) {
      setOpen(false);
    }
  }, [openCommission]);

  return (
    <>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start px-2">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <InformationCircleIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-blue-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-bold mb-5 leading-6 text-gray-900"
                    >
                      Información del Lote
                    </DialogTitle>
                    <div className="mt-2">
                      <form className="w-full">
                        <div className="grid grid-cols-2 md:grid-cols-5 sm:grid-cols-3 -mx-3 gap-x-5">
                          {Object.entries(detalleLote)
                            .filter(
                              (key) =>
                                key[0] !== "id" &&
                                key[0] !== "desistimiento" &&
                                key[0] !== "_id" &&
                                key[0] !== "__v"
                            )
                            .map(([key, value]) => (
                              <div className="mb-5" key={key}>
                                <label
                                  htmlFor={key}
                                  className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                  {key.replace(/_/g, " ").toUpperCase()}
                                </label>
                                <input
                                  type={
                                    typeof value === "number"
                                      ? "number"
                                      : "text"
                                  }
                                  id={key}
                                  value={key === "valor_total_recibido" ? valorTotalRecibido : value}
                                  onChange={
                                    key === "valor_total_recibido"
                                      ? handleValorTotalRecibido
                                      : undefined
                                  }
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                                  disabled={
                                    !(edit && key === "valor_total_recibido")
                                  }
                                />
                              </div>
                            ))}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {type === "desistimiento" ? (
                    <button
                      type="button"
                      data-autofocus
                      onClick={() => setOpenAlert(true)}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm ring-1 ring-inset ring-red-500 hover:bg-red-400 sm:mt-0 sm:w-auto"
                    >
                      Eliminar Permanentemente
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-autofocus
                      onClick={() => setOpenAlert(true)}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm ring-1 ring-inset ring-red-500 hover:bg-red-400 sm:mt-0 sm:w-auto"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {type === "desistimiento" ? (
                    <>
                      <button
                        onClick={()=>resolverLoteDesistido()}
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto disabled:hover:cursor-not-allowed"
                      >
                        Resolver Desistimiento
                      </button>
                      <button
                        type="button"
                        onClick={handleEditButton}
                        className={`mt-3 inline-flex w-full justify-center rounded-md ${
                          edit ? "bg-blue-800" : "bg-blue-600"
                        } px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 ${
                          edit ? "hover:bg-blue-600" : "hover:bg-blue-400"
                        } sm:ml-3 sm:mt-0 sm:w-auto`}
                      >
                        {edit ? "Enviar" : "Editar"}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setOpenCommission(true)}
                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto disabled:hover:cursor-not-allowed"
                        disabled={detalleLote.saldo_por_pagar <= 0}
                      >
                        Registrar Comision
                      </button>
                      <button
                        type="button"
                        onClick={handleEditButton}
                        className={`mt-3 inline-flex w-full justify-center rounded-md ${
                          edit ? "bg-blue-800" : "bg-blue-600"
                        } px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 ${
                          edit ? "hover:bg-blue-600" : "hover:bg-blue-400"
                        } sm:ml-3 sm:mt-0 sm:w-auto`}
                      >
                        {edit ? "Enviar" : "Editar"}
                      </button>
                      <button
                        type="button"
                        data-autofocus
                        onClick={() => setOpen(false)}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                </div>
                {successMessage && (
                  <div
                    className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                    role="alert"
                  >
                    <div className="flex">
                      <div className="py-1">
                        <svg
                          className="fill-current h-6 w-6 text-teal-500 mr-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold">Lote Actualizado</p>
                        <p className="text-sm">{successMessage}</p>
                      </div>
                    </div>
                  </div>
                )}
                {errorMessage && (
                  <div
                    className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                    role="alert"
                  >
                    <div className="flex">
                      <div className="py-1">
                        <svg
                          className="fill-current h-6 w-6 text-teal-500 mr-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold">Error</p>
                        <p className="text-sm">{errorMessage}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
