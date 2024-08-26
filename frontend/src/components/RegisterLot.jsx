"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

export default function RegisterLot({
  openModalRegister,
  setOpenModalRegister,
  listarLotes,
  condiciones
}) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    etapa: 1,
    manzana: "",
    lote: 1,
    nombre_cliente: "",
    fecha_reserva: "",
    vendedor: "",
    valor_venta: 0,
    descuento: 0,
    valor_reserva: 0,
    tipo_financiamiento: "",
    valor_total_recibido: 0,
    porcentaje_comision: 0,
    observacion: "",
    condicion: "A",
  });

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.fecha_reserva = dateFormatter(form.fecha_reserva);
    try {
      const token = localStorage.getItem('token')
      const requestedOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
         },
        body: JSON.stringify(form),
      };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/lotes/registrar`,
        requestedOptions
      );
      const data = await response.json();
      if (response.status === 200) {
        setSuccessMessage(data.msg);
        listarLotes();
        setTimeout(() => {
          setSuccessMessage("");
          setForm({
            etapa: 1,
            manzana: "",
            lote: 1,
            nombre_cliente: "",
            fecha_reserva: "",
            vendedor: "",
            valor_venta: 0,
            descuento: 0,
            valor_reserva: 0,
            tipo_financiamiento: "",
            valor_total_recibido: 0,
            porcentaje_comision: 0,
            observacion: "",
            condicion: "A",
          });
          setOpenModalRegister(false);
        }, 2000);
      } else {
        console.log(data);
        setErrorMessage(data.msg);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dateFormatter = (dateString) => {
    // Dividir la cadena de entrada en partes: año, mes, día
    const [year, month, day] = dateString.split("-");

    // Crear una nueva fecha usando los componentes individuales
    const date = new Date(year, month - 1, day);

    // Formatear la fecha en "D/M/YYYY"
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    return formattedDate;
  };



  return (
    <Dialog
      open={openModalRegister}
      onClose={setOpenModalRegister}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start px-2">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <PlusCircleIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-green-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-bold mx-5 mt-1 leading-6 text-gray-900"
                  >
                    Lote Nuevo
                  </DialogTitle>
                  <div className="mt-2">
                    <form
                      id="lotRegisterForm"
                      className="w-full"
                      onSubmit={handleSubmit}
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 -mx-3 gap-x-5">
                        <div className="mb-5">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Etapa
                          </label>
                          <select
                            name="etapa"
                            value={form.etapa}
                            onChange={handleForm}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                        <div className="mb-5">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Manzana
                          </label>
                          <input
                            type="text"
                            name="manzana"
                            value={form.manzana}
                            onChange={handleForm}
                            maxLength={2}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                          />
                        </div>
                        <div className="mb-5">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Lote
                          </label>
                          <input
                            type="number"
                            name="lote"
                            value={form.lote}
                            onChange={handleForm}
                            min={1}
                            max={50}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                          />
                        </div>
                        <div className="mb-5">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Nombre Cliente
                          </label>
                          <input
                            type="text"
                            name="nombre_cliente"
                            value={form.nombre_cliente}
                            onChange={handleForm}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                          />
                        </div>
                        <div className="mb-5">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Fecha de Reserva
                          </label>
                          <input
                            type="date"
                            name="fecha_reserva"
                            value={form.fecha_reserva}
                            onChange={handleForm}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                          />
                        </div>
                        <div className="mb-5">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Vendedor
                          </label>
                          <input
                            type="text"
                            name="vendedor"
                            value={form.vendedor}
                            onChange={handleForm}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                          />
                        </div>
                        <div className="mb-5">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Valor de Venta
                          </label>
                          <input
                            type="number"
                            name="valor_venta"
                            value={form.valor_venta}
                            step={0.01}
                            required
                            onChange={handleForm}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                          />
                        </div>
                        <div className="mb-5">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            % Descuento
                          </label>
                          <input
                            type="number"
                            name="descuento"
                            value={form.descuento}
                            min={0}
                            step={0.01}
                            max={100}
                            required
                            onChange={handleForm}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                          />
                        </div>
                        <div className="mb-5">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Valor de Reserva
                          </label>
                          <input
                            type="number"
                            name="valor_reserva"
                            value={form.valor_reserva}
                            onChange={handleForm}
                            min={0}
                            required
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                          />
                        </div>

                        <div className="mb-5">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Valor Total Recibido
                          </label>
                          <input
                            type="number"
                            name="valor_total_recibido"
                            value={form.valor_total_recibido}
                            onChange={handleForm}
                            min={0}
                            required
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                          />
                        </div>
                        <div className="mb-5">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            % Comisión
                          </label>
                          <input
                            type="number"
                            name="porcentaje_comision"
                            min={0}
                            step={0.01}
                            max={100}
                            required
                            value={form.porcentaje_comision}
                            onChange={handleForm}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                          />
                        </div>
                        <div className="mb-5">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Observación
                          </label>
                          <input
                            type="text"
                            name="observacion"
                            value={form.observacion}
                            onChange={handleForm}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                          />
                        </div>
                        <div className="mb-5">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Tipo de Condición
                          </label>
                          <select
                            name="condicion"
                            value={form.condicion}
                            onChange={handleForm}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                          >
                            {condiciones.map(condicion =>( 
                              <option key={condicion._id} value={condicion.nombre}>
                                {condicion.nombre}
                              </option>)
                            )}
                          </select>
                        </div>
                        <div className="mb-5">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Tipo financiamiento
                          </label>
                          <textarea
                            type="text"
                            name="tipo_financiamiento"
                            value={form.tipo_financiamiento}
                            onChange={handleForm}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                form="lotRegisterForm"
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto disabled:hover:cursor-not-allowed"
              >
                Registrar Lote
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpenModalRegister(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
              >
                Cancelar
              </button>
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
                className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md mt-5"
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
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
