import { useState } from 'react'
const UserForm = () => {

    const [isUser, setIsUser] = useState(true);

    const handleTypeUser = (e) => {
        if (e.target.value === 'admin'){
            setIsUser(false);
        }else{
            setIsUser(true);
        }
    } 
    
    return (
        <>
        <a href="/admin/"className="inline-flex items-center border border-blue-900 px-3 py-1.5 m-8 rounded-md text-blue-900 hover:bg-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
                </path>
            </svg>
            <span className="ml-1 font-bold text-lg">Regresar</span>
        </a>
            <form className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="tipo" className="block mb-2 text-sm font-medium text-gray-900">Tipo</label>
                    <select id="type" onChange={handleTypeUser} name='typeSelected' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value='user'>Usuario</option>
                        <option value='admin'>Administrador</option>
                    </select>
                </div>
                <div className={`mb-5 ${isUser ? '' : 'hidden'}`}>
                    <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
                    <input type="text" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"required />
                </div>
                <div className={`mb-5 ${isUser ? '' : 'hidden'}`}>
                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900">Apellido</label>
                    <input type="text" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className={`mb-5 ${isUser ? 'hidden' : ''}`}>
                    <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900">Usuario</label>
                    <input type="text" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"required />
                </div>
                <div className={`mb-5 ${isUser ? 'hidden' : ''}`}>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                    <input type="text" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="tucorreo@email.com" required />
                </div>
                <button type="submit" className="text-white bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Registrar {isUser ? 'Usuario' : 'Administrador'}</button>
            </form>
        </>
    )
}
export default UserForm;