import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ConfirmEmail(){
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const {token}= useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        const confirmEmail = async () =>{
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/usuario/verificar-token/${token}`)
                const data = await response.json()
                if (response.ok){
                    console.log(data)
                    setSuccess(data.msg)
                    setTimeout(()=>{
                        setSuccess('')
                        navigate('/login')
                    },3000)
                }else{
                    console.log(data)
                    const responseAdmin = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/verificar-token/${token}`)
                    const dataAdmin = await responseAdmin.json()
                    if (responseAdmin.ok){
                        setSuccess(dataAdmin.msg)
                        setTimeout(()=>{
                            setSuccess('')
                            navigate('/login')
                        },3000)
                    }else{
                        setError(data.msg)
                    }
                }
                
            } catch (error) {
                console.log(error)
            }
        }
        confirmEmail()
    },[])
    return (
        <>
        {success && (
        <div
          className="absolute right-8 flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Exito! </span>
            {success}
          </div>
        </div>
      )}
        {error && (
        <div
          className="absolute right-8 flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Error! </span>
            {error}
          </div>
        </div>
      )}
         <div className="bg-gray-200 w-full px-16 md:px-0 h-screen flex items-center justify-center">
            <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
                <p className="text-6xl md:text-5xl lg:text-7xl font-bold tracking-wider text-gray-300">Confirmar Correo</p>
                <p className="text-2xl md:text-1xl lg:text-3xl font-bold tracking-wider text-gray-500 mt-4">Espera mientras se responde su petición</p>
                <span className="flex items-center space-x-2 bg-gray-600 text-gray-100 px-4 py-2 mt-6 rounded">Automaticamente se redirigirá al inicio de sesión</span>
            </div>
        </div>
        </>
    )
}