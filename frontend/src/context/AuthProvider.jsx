import { createContext, useEffect, useState } from "react"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})

    const perfil = async(token) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/perfil`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await fetch(url,options)
            const data = await respuesta.json()
            setAuth(data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token)
        {
            perfil(token)
        }
    }, [auth])
    
    return (
        <AuthContext.Provider value={
            {
                auth,
                setAuth              
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}
export default AuthContext