import { useState, useEffect } from 'react'
const UsersTable = () => {
    const [usuarios, setUsuarios] = useState([])
    const [admins, setAdmins] = useState([])

    useEffect(()=>{
        const listarUsuarios = async () =>{
            try {
                const response = await fetch('http://localhost:3000/api/admin/usuarios')
                const data = await response.json()
                if (response.ok){
                    console.log(data)
                    setUsuarios(data.usuarios)
                    setAdmins(data.admins)
                }else{
                    console.log(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        listarUsuarios()
    },[])
    return(
        <>
        <a href="/admin/"className="inline-flex items-center border border-blue-900 px-3 py-1.5 m-8 rounded-md text-blue-900 hover:bg-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
                </path>
            </svg>
            <span className="ml-1 font-bold text-lg">Regresar</span>
        </a>
        <div>
            <div className="flex flex-col items-center overflow-x-auto max-h-[40vh] mb-8">
                <span className="font-bold text-xl mb-2">Usuarios</span>
                <div className="inline-block w-[90vw] overflow-x-auto">        
                <table className="min-w-full  text-sm font-light" >
                    <thead className={`border-b border-neutral-200 font-medium bg-slate-100 sticky top-0`} >
                    <tr>
                        <th className="px-6 py-2 sticky top-0">Nombre</th>
                        <th className="px-6 py-2 sticky top-0">Apellido</th>
                        <th className="px-6 py-2 sticky top-0">Email</th>
                        <th className="px-6 py-2 sticky top-0">Email Confirmado</th>
                    </tr>
                    </thead>
                    <tbody className='divide-y text-center'>
                        {usuarios.map((usuario) => (
                            <tr className="border-b border-neutral-20 hover:bg-gray-300 hover:cursor-pointer" key={usuario._id}>
                                <td className="whitespace-nowrap px-6 py-4">{usuario.nombre}</td>
                                <td className="whitespace-nowrap px-6 py-4">{usuario.apellido}</td>
                                <td className="whitespace-nowrap px-6 py-4">{usuario.email}</td>
                                <td className="whitespace-nowrap px-6 py-4">{usuario.confirmarEmail ? 'Confirmado': 'No Confirmado'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
            <div className="flex flex-col items-center overflow-x-auto max-h-[40vh]">
            <span className="font-bold text-xl mb-2">Administradores</span>
                <div className="inline-block w-[90vw] overflow-x-auto">        
                <table className="min-w-full  text-sm font-light" >
                    <thead className={`border-b border-neutral-200 font-medium bg-slate-100 sticky top-0`} >
                    <tr>
                        <th className="px-6 py-2 sticky top-0">Nombre</th>
                        <th className="px-6 py-2 sticky top-0">Email</th>
                        <th className="px-6 py-2 sticky top-0">Email Confirmado</th>
                    </tr>
                    </thead>
                    <tbody className='divide-y text-center'>
                        {admins.map((admin) => (
                            <tr className="border-b border-neutral-20 hover:bg-gray-300 hover:cursor-pointer" key={admin._id}>
                                <td className="whitespace-nowrap px-6 py-4">{admin.nombre_usuario}</td>
                                <td className="whitespace-nowrap px-6 py-4">{admin.email}</td>
                                <td className="whitespace-nowrap px-6 py-4">{admin.confirmarEmail ? 'Confirmado': 'No Confirmado'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        </>
    )
}
export default UsersTable