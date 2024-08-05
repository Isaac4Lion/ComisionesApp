import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const Alert = ({openAlert, setOpenAlert, setOpen, setSuccess, detalleLote, listarLotes}) => {

    const handleDeleteButton = async (e) => {
        e.preventDefault()
        try {
            const requestedOptions = {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            }
            const response = await fetch(`http://localhost:3000/api/lotes/${detalleLote.id}`,requestedOptions)
            const data = await response.json()
            if (response.status === 200){
                listarLotes()
                setOpenAlert(false)
                setOpen(false)
                setSuccess(data.msg)
                setTimeout(() => setSuccess(''),2000)
            }else{
                setOpenAlert(false)
                setOpen(false)
                setError(data.msg)
                setTimeout(() => setError(''),2000)
            }
        } catch (error) {
            console.log(error)
        }

    }
    
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
                      Eliminar Lote
                    </DialogTitle>
                    <div className="mt-2">
                      <form className="w-full">
                        <div className="">
                          ¿Estás seguro de eliminar este lote? Esta acción no se puede deshacer.
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                type="button"
                onClick={handleDeleteButton}
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
    </>
    )
}
export default Alert;