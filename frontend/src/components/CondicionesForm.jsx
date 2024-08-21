import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function CondicionesForm({
  open,
  setOpen,
  setSuccess,
  actualId,
  setActualId,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [option, setOption] = useState("porcentaje");
  const [form, setForm] = useState({
    nombre: "",
    porcentaje_comision: "",
    nro_pagos: 2,
    condicion_porcentaje: "",
    condicion_dias: "",
  });

  const [editMode, setEditMode] = useState(false)

  const handleValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSelect = (e) => {
    if (e.target.value === "porcentaje") {
      setForm({ ...form, condicion_dias: "" });
    } else if (e.target.value === "dias") {
      setForm({ ...form, condicion_porcentaje: "" });
    }
    setOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatedForm = {
      nombre: form.nombre,
      nro_pagos: Number(form.nro_pagos),
      porcentaje_comision: Number(form.porcentaje_comision),
      condicion_dias: Number(form.condicion_dias),
      condicion_porcentaje: Number(form.condicion_porcentaje),
    };
    try {
      const response = await fetch("http://localhost:3000/api/condicion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formatedForm),
      });
      const data = await response.json();
      if (response.ok) {
        setOpen(false);
        setForm({
          nombre: "",
          porcentaje_comision: "",
          nro_pagos: 2,
          condicion_porcentaje: "",
          condicion_dias: "",
        });
        setSuccess(data.msg);
        setTimeout(() => {
          setSuccess("");
        }, 3000);
        setOption("porcentaje");
      } else {
        setErrorMessage(data.msg);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      console.log(error);
    }
  };

  const editarCondicion = async(id) => {
    try {
      const formatedForm = {
        nombre: form.nombre,
        nro_pagos: Number(form.nro_pagos),
        porcentaje_comision: Number(form.porcentaje_comision),
        condicion_dias: Number(form.condicion_dias),
        condicion_porcentaje: Number(form.condicion_porcentaje),
      }
      const options={
        method: 'PUT',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formatedForm)
      }
      const response = await fetch(`http://localhost:3000/api/condicion/${id}`,options)
      const data = await response.json()
      if (response.ok){
        setOpen(false)
        setSuccess(data.msg)
        setTimeout(()=>{
          setSuccess('')
        },3000)
      }else{
        setErrorMessage(data.msg)
        setTimeout(()=>{
          setErrorMessage('')
        },3000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const detalleCondicion = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/condicion/${id}`);
      const data = await response.json();
      if (response.ok) {
        setForm({
            nombre: data?.nombre,
            porcentaje_comision: data?.porcentaje_comision,
            nro_pagos: data?.nro_pagos,
            condicion_porcentaje: data?.condicion_porcentaje || '',
            condicion_dias: data?.condicion_dias || ''
        })
        if (data?.condicion_porcentaje){
          setOption('porcentaje')
        } else if(data?.condicion_dias){
          setOption('dias')
          document.getElementById('selectOption').value = 'dias'
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(actualId) {
      detalleCondicion(actualId);
      setEditMode(true)
    }else{
      setEditMode(false)
      setForm({
        nombre: "",
        porcentaje_comision: "",
        nro_pagos: 2,
        condicion_porcentaje: "",
        condicion_dias: "",
      })
      setOption('porcentaje')
    }
  }, [actualId]);

  useEffect(()=>{
    if(!open){
      setActualId(null);
      setEditMode(false)
    }
  }, [open])

  return (
    <>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start px-2">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <InformationCircleIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-blue-600"
                    />
                  </div>
                  <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-bold mb-5 leading-6 text-gray-900"
                    >
                      Condición
                    </DialogTitle>
                    <div className="mt-2">
                      <form
                        id="condicionForm"
                        onSubmit={handleSubmit}
                        className="w-full grid gap-2 grid-cols-2"
                      >
                        <div className="w-full col-span-2">
                          <label className="mb-2 text-sm font-medium text-gray-900">
                            Nombre
                          </label>
                          <input
                            type={"text"}
                            maxLength={20}
                            name="nombre"
                            value={form.nombre}
                            onChange={handleValue}
                            placeholder="Ingresa el nombre de la condición"
                            className="shadow-sm w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                          />
                        </div>
                        <div className="w-full">
                          <label className="mb-2 text-sm font-medium text-gray-900">
                            Porcentaje de la comisión
                          </label>
                          <input
                            type={"number"}
                            min={0}
                            max={5}
                            step={0.01}
                            name="porcentaje_comision"
                            value={form.porcentaje_comision}
                            onChange={handleValue}
                            placeholder="% Comisión"
                            className="shadow-sm w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                          />
                        </div>
                        <div className="w-full">
                          <label className="mb-2 text-sm font-medium text-gray-900">
                            Nro de pagos
                          </label>
                          <input
                            type={"number"}
                            min={1}
                            max={5}
                            name="nro_pagos"
                            value={form.nro_pagos}
                            onChange={handleValue}
                            className="shadow-sm w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                          />
                        </div>
                        <div className="w-full">
                          <label className="mb-2 text-sm font-medium text-gray-900">
                            Tipo de Condición
                          </label>
                          <select
                          id="selectOption"
                            onChange={handleSelect}
                            className="shadow-sm w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                          >
                            <option value={"porcentaje"}>Porcentaje</option>
                            <option value={"dias"}>Días</option>
                          </select>
                        </div>
                        <div
                          className={`w-full ${
                            option !== "porcentaje" && "hidden"
                          }`}
                        >
                          <label className="mb-2 text-sm font-medium text-gray-900">
                            Porcentaje del Valor Total Pagado
                          </label>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            name="condicion_porcentaje"
                            value={form.condicion_porcentaje}
                            onChange={handleValue}
                            placeholder="% Valor Total Pagado"
                            className="shadow-sm w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                          />
                        </div>
                        <div
                          className={`w-full ${option !== "dias" && "hidden"}`}
                        >
                          <label className="mb-2 text-sm font-medium text-gray-900">
                            Días despues de la reserva
                          </label>
                          <input
                            type="number"
                            min={30}
                            name="condicion_dias"
                            value={form.condicion_dias}
                            onChange={handleValue}
                            placeholder="Días despues de la reserva"
                            className="shadow-sm w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between w-full">
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    form="condicionForm"
                    className={`inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto disabled:hover:cursor-not-allowed ${editMode && 'hidden'}`}
                  >
                    Registrar Condición
                  </button>
                  <button
                    onClick={()=>editarCondicion(actualId)}
                    type="button"
                    form="condicionForm"
                    className={`inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto disabled:hover:cursor-not-allowed ${!editMode && 'hidden'}`}
                  >
                    Modificar Condición
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                  >
                    Cancelar
                  </button>
                </div>
                <div className="fixed top-0 w-full">
                  {errorMessage && (
                    <div
                      className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"
                      role="alert"
                    >
                      <div className="flex">
                        <div className="py-1">
                          <svg
                            className="fill-current h-6 w-6 text-red-500 mr-4"
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
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
