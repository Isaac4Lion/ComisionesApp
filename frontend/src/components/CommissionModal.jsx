'use client'
import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const CommissionModal = ({
    open,
    setOpen, 
    openCommission,
    setOpenCommission,
    detalleLote, 
    listarLotes,
    updateCommission,
    setUpdateCommission
    }) => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [form, setForm] = useState({
        abono_comision: '',
        fecha_abono: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestedOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    abono_comision: form.abono_comision,
                    fecha_abono: dateFormatter(form.fecha_abono)
                })
            }
            const response = await fetch(`http://localhost:3000/api/comisiones/${detalleLote.id}`, requestedOptions);
            const data = await response.json();
            if (response.ok) {
                setSuccessMessage('Comisión registrada con éxito');
                setUpdateCommission(true);
                listarLotes()
                setTimeout(() => {
                    setSuccessMessage('');
                    setOpenCommission(false);
                  }, 2000);
            } else {
                setErrorMessage(data.msg || 'Ocurrió un error');
                setTimeout(() => {
                    setErrorMessage('');
                  }, 2000);
            }
        } catch (error) {
            setErrorMessage('Ocurrió un error al registrar la comisión');
        }
    }

    const dateFormatter = (dateString) => {
        // Dividir la cadena de entrada en partes: año, mes, día
        const [year, month, day] = dateString.split('-');
    
        // Crear una nueva fecha usando los componentes individuales
        const date = new Date(year, month - 1, day);
    
        // Formatear la fecha en "D/M/YYYY"
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    
        return formattedDate;
    }

    return(
        <Dialog open={openCommission} onClose={setOpenCommission} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start px-2">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <PlusCircleIcon aria-hidden="true" className="h-6 w-6 text-green-500" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base mb-5 leading-6 text-gray-900">
                                        <span className='font-bold'>Registro de Comisión</span> - CLIENTE: {detalleLote.nombre_cliente}
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <form className="w-full">
                                            <div className="grid grid-cols-3 -mx-3 gap-x-5">
                                                {Object.entries(detalleLote).filter(([key]) => 
                                                    key !== 'id' && 
                                                    key !== 'nombre_cliente' && 
                                                    key !== 'desistimiento' && 
                                                    key !== 'fecha_reserva' &&
                                                    key !== 'vendedor' && 
                                                    key !== 'etapa' && 
                                                    key !== 'manzana' && 
                                                    key !== 'lote' && 
                                                    key !== 'area' && 
                                                    key !== 'descuento' && 
                                                    key !== 'valor_descuento' && 
                                                    key !== 'valor_reserva' && 
                                                    key !== 'tipo_financiamiento'
                                                ).map(([key, value]) => (
                                                <div className="mb-5" key={key}>
                                                    <label htmlFor={key} className="block mb-2 text-sm font-medium text-gray-900">
                                                        {key.replace(/_/g, ' ').toUpperCase()}
                                                    </label>
                                                    <input
                                                        type={typeof value === 'number' ? 'number' : 'text'}
                                                        id={key}
                                                        defaultValue={key === 'valor_total_recibido' ? value : undefined}
                                                        value={key !== 'valor_total_recibido' ? value : undefined}
                                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                                                        disabled
                                                        required
                                                    />
                                                </div>
                                                ))}
                                            </div>
                                        </form>
                                        <form className="w-full" onSubmit={handleSubmit}>
                                            <div className="grid grid-cols-2 -mx-3 gap-x-5">
                                                <div className="mb-5">
                                                    <label htmlFor="abono_comision" className="block mb-2 text-sm font-medium text-gray-900">
                                                        Comisión
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="abono_comision"
                                                        name="abono_comision"
                                                        value={form.abono_comision}
                                                        onChange={handleChange}
                                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="fecha_abono" className="block mb-2 text-sm font-medium text-gray-900">
                                                        Fecha Abono
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="fecha_abono"
                                                        name="fecha_abono"
                                                        value={form.fecha_abono}
                                                        onChange={handleChange}
                                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                <button
                                                    type="submit"
                                                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                                >
                                                    Registrar
                                                </button>
                                                <button
                                                    type="button"
                                                    data-autofocus
                                                    onClick={() => {
                                                        setOpenCommission(false)
                                                        setOpen(true)
                                                    }}
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </form>
                                        {successMessage && (
                                            <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mt-5" role="alert">
                                                <div className="flex">
                                                    <div className="py-1">
                                                        <svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">Registro de Comisión</p>
                                                        <p className="text-sm">{successMessage}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {errorMessage && (
                                            <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md mt-5" role="alert">
                                                <div className="flex">
                                                    <div className="py-1">
                                                        <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
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
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
export default CommissionModal;
