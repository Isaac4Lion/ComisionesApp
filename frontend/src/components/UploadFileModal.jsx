import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const UploadFileModal = ({file, setFile, onAlert, successMessage, errorMessage, open, setOpen, setOpenAlert }) => {
  
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onClose={() => {setOpen(false); setFile(null)}} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 w-full text-base sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-center font-bold mb-5 leading-6 text-gray-900"
                  >
                    Subir archivo
                  </DialogTitle>
                  <div className="mt-2">
                    <form className="w-full">
                      <div className="flex flex-col items-center justify-center w-full">
                        <label
                          htmlFor="file"
                          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${file ? 'hidden' : ''}`}
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Haz click para seleccionar tu archivo
                              </span>{" "}
                              o arrastra y suelta
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Solo archivos .xlsx
                            </p>
                          </div>
                          <input
                            id="file"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                        {file && (
                          <section className="my-4">
                            <span className="font-bold">
                            Detalles del Archivo
                            </span>
                            <ul>
                              <li><span className="font-bold">Nombre:</span> {file.name}</li>
                              <li><span className="font-bold">Tamaño:</span> {file.size} bytes</li>
                            </ul>
                          </section>
                        )}

                        {file && (
                          <button
                            type="button"
                            className="w-48 justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:hover:cursor-not-allowed"
                            onClick={()=>setOpenAlert(true)}
                            disabled={onAlert}
                          >
                            Subir a BDD
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center items-center gap-4 mb-5">
              <button
                type="button"
                data-autofocus
                onClick={() => {setOpen(false); setFile(null)}}
                disabled={onAlert}
                className="w-48 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 "
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
                    <p className="font-bold">Base de Datos Actualizada</p>
                    <p className="text-sm">{successMessage}</p>
                  </div>
                </div>
              </div>
            )}
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
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
export default UploadFileModal;
