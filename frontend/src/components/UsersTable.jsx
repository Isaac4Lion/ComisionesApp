const UsersTable = () => {
    return(
        <>
        <a href="/admin/"className="inline-flex items-center border border-blue-900 px-3 py-1.5 m-8 rounded-md text-blue-900 hover:bg-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
                </path>
            </svg>
            <span className="ml-1 font-bold text-lg">Regresar</span>
        </a>
        <div className="flex flex-col items-center overflow-x-auto max-h-[70vh]">
            <div className="inline-block w-[90vw] overflow-x-auto">        
            <table className="min-w-full  text-sm font-light" >
                <thead className={`border-b border-neutral-200 font-medium bg-slate-100 sticky top-0`} >
                <tr>
                    <th className="px-6 py-2 sticky top-0">Tipo</th>
                    <th className="px-6 py-2 sticky top-0">Nombre</th>
                    <th className="px-6 py-2 sticky top-0">Apellido</th>
                    <th className="px-6 py-2 sticky top-0">Email</th>
                    <th className="px-6 py-2 sticky top-0">Email Confirmado</th>
                </tr>
                </thead>
                <tbody className='divide-y text-center'>
                    <tr className="border-b border-neutral-20 hover:bg-gray-300 hover:cursor-pointer">
                        <td className="whitespace-nowrap px-6 py-4">Usuario</td>
                        <td className="whitespace-nowrap px-6 py-4">ASDASDASD</td>
                        <td className="whitespace-nowrap px-6 py-4">ASDASDASD</td>
                        <td className="whitespace-nowrap px-6 py-4">ASDASDASD</td>
                        <td className="whitespace-nowrap px-6 py-4">Sí</td>
                    </tr>
                    <tr className="border-b border-neutral-20 hover:bg-gray-300 hover:cursor-pointer">
                        <td className="whitespace-nowrap px-6 py-4">Administrador</td>
                        <td className="whitespace-nowrap px-6 py-4">ASDASDASD</td>
                        <td className="whitespace-nowrap px-6 py-4">ASDASDASD</td>
                        <td className="whitespace-nowrap px-6 py-4">ASDASDASD</td>
                        <td className="whitespace-nowrap px-6 py-4">Sí</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
        </>
    )
}
export default UsersTable