import { useState } from 'react'
const UserForm = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isUser, setIsUser] = useState(true);
    const [formUser, setFormUser] = useState({
        nombre: '',
        apellido: '',
        email: ''
    })
    const [formAdmin, setFormAdmin] = useState({
        nombre_usuario: '',
        password: '',
        email: ''
    })

    const handleTypeUser = (e) => {
        if (e.target.value === 'admin'){
            setIsUser(false);
            setFormUser({
                nombre: '',
                apellido: '',
                email: ''
            })
        }else{
            setIsUser(true);
            setFormAdmin({
                nombre_usuario: '',
                password: '',
                email: ''
            })
        }
    }

    const handleChangeUser = (e) => {
        setFormUser({...formUser,
            [e.target.name]: e.target.value
        })
    }
    const handleChangeAdmin = (e) => {
        setFormAdmin({...formAdmin,
            [e.target.name]:e.target.value
        })
    }
    
    const handleRegisterUser = async () => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(formUser)
            }
            const response = await fetch('http://localhost:3000/api/admin/registrar-usuario', options)
            const data = await response.json()
            if (response.ok){
                setSuccess(data.res)
                setFormUser({
                    nombre: '',
                    apellido: '',
                    email: ''
                })
                setTimeout(()=>{
                    setSuccess('')
                },3000)
            }else{
                setError(data.msg)
                setTimeout(()=>{
                    setError('')
                },3000)
            }
        } catch (error) {
            console.log(error)
        }
        
    }
    const handleRegisterAdmin = async () => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(formAdmin)
            }
            const response = await fetch('http://localhost:3000/api/admin/registrar-admin', options)
            const data = await response.json()
            if (response.ok){
                setSuccess(data.res)
                setFormAdmin({
                    nombre_usuario: '',
                    password: '',
                    email: ''
                })
                setTimeout(()=>{
                    setSuccess('')
                },3000)
            }else{
                setError(data.msg)
                setTimeout(()=>{
                    setError('')
                },3000)
            }
        } catch (error) {
            console.log(error)
        }
        
    }
    
    return (
        <>
        {error &&
      <div className="absolute right-8 flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Error! </span>{error}
        </div>
      </div>
      }
      {success &&
      <div className="absolute right-8 flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Exito! </span>{success}
        </div>
      </div>
      }
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
                    <label htmlFor='nombre' className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
                    <input type="text" name="nombre" value={formUser.nombre} onChange={handleChangeUser} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"required />
                </div>
                <div className={`mb-5 ${isUser ? '' : 'hidden'}`}>
                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900">Apellido</label>
                    <input type="text" name="apellido" value={formUser.apellido} onChange={handleChangeUser} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className={`mb-5 ${isUser ? 'hidden' : ''}`}>
                    <label htmlFor="nombre_usuario" className="block mb-2 text-sm font-medium text-gray-900">Usuario</label>
                    <input type="text" name="nombre_usuario" value={formAdmin.nombre_usuario} onChange={handleChangeAdmin} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"required />
                </div>
                <div className={`mb-5 ${isUser ? 'hidden' : ''}`}>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                    <input type="password" name="password" value={formAdmin.password} onChange={handleChangeAdmin} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input type="email" name="email" value={isUser ? formUser.email : formAdmin.email} onChange={isUser ? handleChangeUser : handleChangeAdmin} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="tucorreo@email.com" required />
                </div>
                <button type="button" onClick={()=> handleRegisterUser()} className={`text-white bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${!isUser && 'hidden'}`}>Registrar Usuario</button>
                <button type="button" onClick={()=> handleRegisterAdmin()} className={`text-white bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isUser && 'hidden'}`}>Registrar Administrador</button>
            </form>
        </>
    )
}
export default UserForm;