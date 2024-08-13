import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const AlertConfirm = ({file, setFile, openAlert, setOpenAlert, setOpen, setSuccessMessage, setErrorMessage, setOnAlert}) => {

    const handleUpload = async () => {
        if (!file) {
          alert("Por favor, seleccione un archivo para subir.");
          return;
        }
        const formData = new FormData();
        formData.append("f_subir", file);
    
        try {
          const res = await fetch("http://localhost:3000/api/importar-excel", {
            method: "POST",
            body: formData,
          });
    
          if (res.ok) {
            const response = await fetch("http://localhost:3000/api/subir-bdd")
            if (response.ok){
              const data = await response.json();
              setSuccessMessage(data.msg);
              setOpenAlert(false)
              setOnAlert(true)
              setTimeout(()=>{
                setSuccessMessage('')
                setOpen(false)
                setFile(null)
                setOnAlert(false)
              },3000)
            }else{
              setErrorMessage("Algo salió mal!");
              setOpenAlert(false)
              setTimeout(()=>{
                setErrorMessage('')
                setFile(null)
              },3000)
              console.log("Error:", response);
            }
          } else {
            setErrorMessage("Algo salió mal!");
            setOpenAlert(false)
            setTimeout(()=>{
                setErrorMessage('')
                setFile(null)
              },3000)
            console.log("Error:", res);
          }
        } catch (error) {
          setErrorMessage("Algo salió mal");
          setOpenAlert(false)
          setTimeout(()=>{
            setErrorMessage('')
            setFile(null)
          },3000)
          console.error("Error:", error);
        }
      };    
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
                      Subir a la Base de Datos
                    </DialogTitle>
                    <div className="mt-2">
                      <form className="w-full">
                        <div className="">
                          ¿Estás seguro de subir este archivo a la base de datos? Recuerda que TODA la información se actualizará en la base de datos.
                        <div className="mt-4 text-sm">
                          <span className="font-bold">Recomendacion:</span> Descarga una copia de seguridad antes de actualizar.
                        </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                type="button"
                onClick={()=>handleUpload()}
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto disabled:hover:cursor-not-allowed"
                >
                Sí, subir a BDD
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
export default AlertConfirm;