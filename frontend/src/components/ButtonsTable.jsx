const ButtonsTable = ({
  setError,
  setSuccess,
  openModalRegister,
  setOpenModalRegister,
  updateCommission,
  setUpdateCommission,
  listarLotes,
}) => {
  const handleClick = () => {
    setOpenModalRegister(!openModalRegister);
  };
  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/exportar-excel`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        // Extract binary data from the response and convert it to an ArrayBuffer
        const binaryDataBuffer = await res.arrayBuffer();

        // Create a Blob from the ArrayBuffer, specifying the file type (MIME type)
        const blob = new Blob([binaryDataBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // MIME type for Excel files
        });

        // Create a download link for the Blob
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        // Set the download attribute and trigger the download
        a.download = `Comisiones_${new Date().toLocaleDateString()}.xlsx`;
        document.body.appendChild(a);
        a.click();

        // Clean up the temporary URL
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // Handle the case where the response status is not 200
        alert("Algo salió mal!");
      }
    } catch (error) {
      console.log(error);
      alert("Algo salió mal");
    }
  };

  const deleteLastCommission = async () => {
    const token = localStorage.getItem("token");
    const requestedOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/comisiones/eliminar-ultima-comision`,
      requestedOptions
    );
    if (response.status === 200) {
      const data = await response.json();
      setSuccess(data.msg);
      setUpdateCommission(false);
      listarLotes();
      setTimeout(() => setSuccess(""), 3000);
    } else {
      const data = await response.json();
      setError(data.msg);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center m-3 gap-2">
      <button
        onClick={handleClick}
        className="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-current w-4 h-4 mr-2"
          viewBox="0 0 24 24"
        >
          <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
        </svg>
        <span>REGISTRAR NUEVO LOTE</span>
      </button>
      <button
        onClick={handleDownload}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>DESCARGAR COPIA EN EXCEL</span>
      </button>
      <button
        onClick={deleteLastCommission}
        className={`bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ${
          !updateCommission ? "hidden" : ""
        }`}
      >
        <svg
          className="fill-current w-4 h-7 mr-2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z"
            fillRule="nonzero"
          />
        </svg>
        <span>ELIMINAR ÚLTIMA COMISIÓN</span>
      </button>
    </div>
  );
};
export default ButtonsTable;
