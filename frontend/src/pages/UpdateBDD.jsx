import { Link } from "react-router-dom";
import AlertConfirm from "../components/AlertConfirm";
import UploadFileModal from "../components/UploadFileModal";
import { useState } from 'react'
import { PrivateRouteAdmin } from "../routes/PrivateRouteAdmin";

const UpdateBDD = () => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [file, setFile] = useState(null);
  const [onAlert, setOnAlert] = useState(false)
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/exportar-excel`,{headers:{Authorization: `Bearer ${token}`}});

      if (res.status === 200) {
        const binaryDataBuffer = await res.arrayBuffer();

        const blob = new Blob([binaryDataBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // MIME type for Excel files
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        a.download = `Comisiones_${new Date().toLocaleDateString()}.xlsx`;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        alert("Algo salió mal!");
      }
    } catch (error) {
      console.log(error)
      alert("Algo salió mal");
    }
  };

  return (
    <PrivateRouteAdmin>
      <AlertConfirm 
      file={file}
      setFile={setFile}
      setOpen={setOpen}
      openAlert={openAlert}
      setOpenAlert={setOpenAlert}
      setSuccessMessage={setSuccessMessage}
      setErrorMessage={setErrorMessage}
      setOnAlert={setOnAlert}/>

      <UploadFileModal 
      setOpenAlert={setOpenAlert} 
      setOpen={setOpen} 
      open={open} 
      file={file} 
      setFile={setFile} 
      onAlert={onAlert}
      successMessage={successMessage}
      errorMessage={errorMessage} 
      />
      <Link
        to="/admin"
        className="inline-flex items-center border border-blue-900 px-3 py-1.5 mx-8 my-2 sm:m-8 rounded-md text-blue-900 hover:bg-blue-50"
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
      <div className="flex flex-col gap-2 lg:gap-0 mx-2 justify-between items-center lg:flex-row lg:items-center lg:mx-16">
        <div className="w-full flex-1 mt-8 p-8 order-2 bg-white shadow-xl rounded-3xl sm:w-96 h-96 lg:rounded-r-none">
          <div className="mb-7 pb-7 flex items-center border-b border-gray-300">
            <svg
              width="34"
              height="32"
              viewBox="0 0 34 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.2056 23.2381V8.49047L10.5401 13.1952L8.02786 10.5714L17.0001 1.5238L25.9723 10.5714L23.4601 13.1952L18.7945 8.49047V23.2381H15.2056ZM6.23342 30.4762C5.24648 30.4762 4.40189 30.1221 3.69966 29.414C2.99744 28.7059 2.64573 27.8536 2.64453 26.8571V21.4286H6.23342V26.8571H27.7668V21.4286H31.3556V26.8571C31.3556 27.8524 31.0045 28.7047 30.3023 29.414C29.6001 30.1233 28.7549 30.4774 27.7668 30.4762H6.23342Z"
                fill="black"
              />
            </svg>
            <div className="ml-5">
              <span className="block text-2xl font-semibold">Subir Excel</span>
            </div>
          </div>
          <ul className="mb-7 font-medium text-gray-500">
            <li className="flex text-lg">
              <span className="ml-3">
                Se actualizará la tabla con{" "}
                <span className="text-black">la información del excel.</span>
              </span>
            </li>
            <li className="flex text-lg">
              <span className="ml-3">
                <span className="text-black">Ten cuidado,</span> se eliminará la
                información anterior.
              </span>
            </li>
            <li className="flex text-lg">
              <span className="ml-3">
                <span className="text-black">Se recomienda</span> hacer copias
                de seguridad.
              </span>
            </li>
          </ul>
          <button
          onClick={() => setOpen(true)} 
          className="flex w-full justify-center items-center bg-blue-600 rounded-xl py-5 px-4 text-center text-white text-xl hover:bg-blue-400">
            Actualizar Base de Datos
          </button>
        </div>
        <div className="w-full flex-1 mt-8 p-8 order-3 bg-white shadow-xl rounded-3xl sm:w-96 h-96 lg:rounded-l-none">
          <div className="mb-7 pb-7 flex items-center border-b border-gray-300">
            <svg
              width="36"
              height="33"
              viewBox="0 0 36 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.0002 24.3333L8.8335 15.1666L11.4002 12.5083L16.1668 17.275V2.33331H19.8335V17.275L24.6002 12.5083L27.1668 15.1666L18.0002 24.3333ZM7.00016 31.6666C5.99183 31.6666 5.12894 31.3079 4.4115 30.5905C3.69405 29.873 3.33472 29.0095 3.3335 28V22.5H7.00016V28H29.0002V22.5H32.6668V28C32.6668 29.0083 32.3081 29.8718 31.5907 30.5905C30.8732 31.3091 30.0097 31.6679 29.0002 31.6666H7.00016Z"
                fill="black"
              />
            </svg>
            <div className="ml-5">
              <span className="block text-2xl font-semibold">
                Descargar Excel
              </span>
            </div>
          </div>
          <ul className="mb-7 font-medium text-gray-500">
            <li className="flex text-lg mb-2">
              <span className="ml-3">
                Se descargará{" "}
                <span className="text-black">la tabla actual.</span>
              </span>
            </li>
            <li className="flex text-lg mb-2">
              <span className="ml-3">
                Realiza copias de seguridad{" "}
                <span className="text-black">constantemente.</span>
              </span>
            </li>
            <li className="flex text-lg">
              <span className="text-black ml-3">
                Se recomienda{" "}
                <span className="text-gray-500">resolver los lotes desistidos antes.</span>
              </span>
            </li>
          </ul>
          <button
            onClick={handleDownload}
            className="flex w-full justify-center items-center bg-blue-600 rounded-xl py-5 px-4 text-center text-white text-xl hover:bg-blue-400"
          >
            Descargar tabla actual
          </button>
        </div>
      </div>
    </PrivateRouteAdmin>
  );
};
export default UpdateBDD;
